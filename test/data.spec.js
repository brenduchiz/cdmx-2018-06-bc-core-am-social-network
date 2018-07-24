describe('app', () => {
  it('debería ser una función writterNewCommentary', () => {
    assert.isFunction(writterNewCommentary);
  });
  describe('writterNewCommentary', () => {
    it('debería retornar "Hola" ', () => {
      assert.equal(writterNewCommentary(' '), 'Hola');
    });
  });

  it('debería ser una función deleteComment', () => {
    assert.isFunction(deleteComment);
  });
  describe('deleteComment', () => {
    it('debería retornar null ', () => {
      assert.equal(deleteComment('Hola'), null);
    });
  });

  it('debería ser una función editComment en objeto global', () => {
    assert.isFunction(editComment);
  });
  describe('editComment', () => {
    it('debería retornar "Hola mundo"', () => {
      assert.equal(editComment('Hola nundo'), 'Hola mundo');
    });
  });
});