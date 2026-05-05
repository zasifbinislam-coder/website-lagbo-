const Toggle = ({ on, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={() => onChange(!on)}
    className={`toggle ${on ? 'on' : ''}`}
  />
);

export default Toggle;
