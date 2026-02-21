import { GET } from '../../app/api/products/[id]/route';
import { connectToDb } from '../../app/api/db';

jest.mock('../../app/api/db', () => ({
  connectToDb: jest.fn(),
}));

describe('Product GET Handler (/api/products/[id])', () => {
  let mockDb: any;
  let mockCollection: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCollection = {
      findOne: jest.fn(),
    };
    mockDb = {
      collection: jest.fn().mockReturnValue(mockCollection),
    };

    (connectToDb as jest.Mock).mockResolvedValue({ db: mockDb });
  });

  test('should return a product when a valid ID is found (Happy Path)', async () => {
    // Arrange
    const mockProduct = { id: 1, name: 'Hat' };
    const request = {} as any;
    const context = { params: { id: '1' } };

    mockCollection.findOne.mockResolvedValue(mockProduct);

    // Act
    const response = await GET(request, context);

    // Assert
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual(mockProduct);

    expect(mockDb.collection).toHaveBeenCalledWith('products');
    expect(mockCollection.findOne).toHaveBeenCalledWith({ id: '1' });
  });

  test('should return 404 when product ID is not found (Edge Case)', async () => {
    // Arrange
    const request = {} as any;
    const context = { params: { id: '999' } };

    mockCollection.findOne.mockResolvedValue(null);

    // Act
    const response = await GET(request, context);

    // Assert
    expect(response.status).toBe(404);
  });

  test('should return 404 for an invalid (non-numeric) product ID (Edge Case)', async () => {
    // Arrange
    const request = {} as any;
    const context = { params: { id: 'invalid-id' } };

    mockCollection.findOne.mockResolvedValue(null);

    // Act
    const response = await GET(request, context);

    // Assert
    expect(response.status).toBe(404);
    const text = await response.text();
    expect(text).toBe('Product not found');
  });
});