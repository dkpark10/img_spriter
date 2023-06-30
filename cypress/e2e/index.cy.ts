/* eslint-disable cypress/unsafe-to-chain-command */
describe('이미지 스프라이트 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    // cy.visit('https://dkpark10.github.io/img_spriter/');
  });

  // it('이미지 사이즈 조절 테스트.', () => {
  //   const initValue = 1.0;
  //   const step = 0.02;

  //   cy.get('[data-testid="scale_bar"]')
  //     .then(($el) => {
  //       const range = $el[0] as HTMLInputElement;
  //       range.stepUp(4);
  //     })
  //     .trigger('change');

  //   const scaleValue = (4 * step) + initValue;
  //   cy.contains('이미지 사이즈 조절').should('contain.text', scaleValue);
  // });

  it('탭 전환시 이전 드래그 했던 정보들을 렌더링 한다.', () => {
    const tab1Width = 100;
    const tab1Height = 123;

    const tab2Width = 199;
    const tab2Height = 111;

    cy.get('canvas').then(($canvas) => {
      const canvasElement = $canvas[0];
      const {
        height, width, x, y,
      } = canvasElement.getBoundingClientRect();

      cy.log(String(`${x} - ${y} ${width} - ${height}`));

      cy.get('canvas')
        .trigger('mousedown', { which: 1, pageX: 0, pageY: 0 })
        .trigger('mousemove', { which: 1, pageX: 0, pageY: 0 })
        .trigger('mouseup')
        .trigger('mousedown', { which: 1, pageX: x, pageY: y })
        .trigger('mousemove', {
          which: 1,
          pageX: x + tab1Width,
          pageY: y + tab1Height,
        })
        .trigger('mouseup');

      cy.contains('width').should('contain.text', `${tab1Width}px`);
      cy.contains('height').should('contain.text', `${tab1Height}px`);

      cy.contains('이미지 파일 업로드').click();

      cy.contains('이미지가 없습니다.').should('exist');

      cy.get('[data-test-id="file_button"]').selectFile('./public/sample2.jpg', {
        action: 'drag-drop',
      });
    });

    cy.get('canvas').then(($canvas) => {
      const canvasElement = $canvas[0];
      const {
        height, width, x, y,
      } = canvasElement.getBoundingClientRect();

      cy.log(String(`${x} - ${y} ${width} - ${height}`));

      cy.get('canvas')
        .trigger('mousedown', { which: 1, pageX: 0, pageY: 0 })
        .trigger('mousemove', { which: 1, pageX: 0, pageY: 0 })
        .trigger('mouseup')
        .trigger('mousedown', { which: 1, pageX: x, pageY: y })
        .trigger('mousemove', {
          which: 1,
          pageX: x + tab2Width,
          pageY: y + tab2Height,
        })
        .trigger('mouseup');

      cy.contains('width').should('contain.text', `${tab2Width}px`);
      cy.contains('height').should('contain.text', `${tab2Height}px`);

      cy.contains('이미지 경로 검색').click();

      cy.contains('width').should('contain.text', `${tab1Width}px`);
      cy.contains('height').should('contain.text', `${tab1Height}px`);
    });
  });
});
