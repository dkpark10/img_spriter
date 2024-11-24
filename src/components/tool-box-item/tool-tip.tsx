import { Tooltip, type ITooltip } from 'react-tooltip';

export default function ToolTip({ id, place = 'right-start' }: ITooltip): JSX.Element {
  return (
    <Tooltip
      id={id}
      place={place}
      style={{
        padding: '0.25rem',
        backgroundColor: 'white',
        borderRadius: '0.125rem',
        fontSize: '0.875rem',
        color: '#292c39',
      }}
      border="1px solid #292c39"
    />
  );
}
