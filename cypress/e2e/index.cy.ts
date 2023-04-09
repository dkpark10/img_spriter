describe('이미지 스프라이트 테스트', () => {
  beforeEach(() => {
    // cy.exec('yarn dev');
  });

  it('탭 전환시 이전 드래그 했던 정보들을 렌더링 한다.', () => {
    // cy.visit('https://dkpark10.github.io/img_spriter/');
    cy.visit('http://localhost:3000/');

    const steps = ['1', '1.02', '1.04', '1.06', '1.08', '1.1', '1.12', '1.14', '1.16', '1.18', '1.2', '1.22', '1.24'];

    cy.get('input[type=range]')
      .invoke('val', 1.24)
      .trigger('change', { data: 1.24 })
      .click();

    cy.get('[data-testid="scale_text"]')
      .contains('이미지 사이즈 조절: 1.24');
  });
});
