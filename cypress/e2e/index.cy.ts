describe('이미지 스프라이트 테스트', () => {
  beforeEach(() => {
    cy.exec('yarn dev');
  });

  it('사이트 방문', () => {
    cy.visit('/');
  });
});
