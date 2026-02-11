import { GET } from '../../app/api/products/[id]/route';
import { connectToDb } from '../../app/api/db';

// --- MOCK (Advanced Technique 1) ---
// We mock the entire database connection module to prevent any real database
// calls, isolating our route handler logic for a true unit test.
jest.mock('../../app/api/db', () => ({
  connectToDb: jest.fn(),
}));

describe('Product GET Handler (/api/products/[id])', () => {
  let mockDb: any;
  let mockCollection: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Arrange: Set up our mock database structure for each test.
    mockCollection = {
      findOne: jest.fn(), // This will be our Stub
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

    // --- STUB (Advanced Technique 3) ---
    // We "stub" the `findOne` method to return a predefined object.
    // This lets us test the "found" path without a real database.
    mockCollection.findOne.mockResolvedValue(mockProduct);

    // Act
    const response = await GET(request, context);

    // Assert
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual(mockProduct);

    // --- SPY (Advanced Technique 2) ---
    // We verify (spy) that the code called the database collection method with 'products'.
    expect(mockDb.collection).toHaveBeenCalledWith('products');
    expect(mockCollection.findOne).toHaveBeenCalledWith({ id: '1' });
  });

  test('should return 404 when product ID is not found (Edge Case)', async () => {
    // Arrange
    const request = {} as any;
    const context = { params: { id: '999' } };
    // Stub `findOne` to return null, simulating a "not found" scenario.
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

    // Stub `findOne` to return null (simulating not found)
    mockCollection.findOne.mockResolvedValue(null);

    // Act
    const response = await GET(request, context);

    // Assert
    // We expect 404 because the mock returns null.
    // Without explicit validation in the handler, "invalid-id" is treated as "not found".
    expect(response.status).toBe(404);
    // The error indicates the response body is plain text, not JSON, so we use .text()
    const text = await response.text();
    expect(text).toBe('Product not found');
  });
});