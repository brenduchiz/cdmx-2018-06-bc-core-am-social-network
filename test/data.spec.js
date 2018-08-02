describe('app2', () => {
  it('debería ser una función writterNewCommentary', () => {
    assert.isFunction(writterNewCommentary);
  });
  describe('writterNewCommentary', () => {
    it('debería retornar "Hola" ', () => {
      assert.equal(writterNewCommentary(' '), 'Hola');
    });
  });

  it('debería ser una función deletePost', () => {
    assert.isFunction(deletePost);
  });
  describe('deletePost', () => {
    it('debería retornar null ', () => {
      assert.equal(deletePost('Hola'), null);
    });
  });

  it('debería ser una función updatePost', () => {
    assert.isFunction(updatePost);
  });
  describe('updatePost', () => {
    it('debería retornar "Hola mundo"', () => {
      assert.equal(updatePost('Hola nundo'), 'Hola mundo');
    });
  });
});