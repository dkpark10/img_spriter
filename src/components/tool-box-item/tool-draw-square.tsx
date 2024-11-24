// /* eslint-disable @typescript-eslint/no-confusing-void-expression */
// import { createPortal } from 'react-dom';
// import { useEffect, useState } from 'react';
// import { FaRegPenToSquare } from 'react-icons/fa6';
// import { useRecoilState } from 'recoil';
// import clsx from 'clsx';
// import { currentToolAtom, type CurrentToolAtom } from '@/store';

// interface ModalProps {
//   isOpen: boolean;
//   close: () => void;
// }

// function DescriptionModal({ isOpen, close }: ModalProps): JSX.Element {
//   useEffect(() => {
//     close();
//   }, [isOpen, close]);

//   // eslint-disable-next-line react/jsx-no-useless-fragment
//   if (!isOpen) return <></>;

//   return createPortal(
//     <div className="absolute top-[303px] left-[90px]">
//       <span className="p-1 bg-white rounded text-sm border border-solid border-[#292c39]">
//         정사각형을 그리는 모드입니다.
//       </span>
//     </div>,
//     document.getElementById('portal') as Element,
//   );
// }

// export default function ToolDrawSquare(): JSX.Element {
//   const [currentToolState, setCurrentToolState] = useRecoilState(currentToolAtom);

//   const [hover, setHover] = useState(false);
//   const overlay = useOverlay();

//   useEffect(() => {
//     overlay.open(({ close }) => <DescriptionModal isOpen={hover} close={close} />);
//   }, [hover, overlay]);

//   return (
//     <button
//       onClick={() => {
//         setCurrentToolState(
//           (prev): CurrentToolAtom => ({
//             ...prev,
//             drawSquare: !prev.drawSquare,
//           }),
//         );
//       }}
//       type="button"
//       onMouseOver={() => setHover(true)}
//       onFocus={() => setHover(true)}
//       onMouseOut={() => setHover(false)}
//       onBlur={() => setHover(false)}
//       className={clsx([
//         currentToolState.drawSquare && 'bg-[#e0e0e0]',
//         'border border-solid border-[#292c39] flex items-center p-2 justify-center hover:bg-[#e0e0e0]',
//       ])}
//     >
//       <FaRegPenToSquare size={23} />
//     </button>
//   );
// }
