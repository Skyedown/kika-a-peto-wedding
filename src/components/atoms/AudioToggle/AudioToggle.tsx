import { useAmbientAudio } from '@hooks/useAmbientAudio';
import './AudioToggle.less';

// Maly prepinac hudby v rohu. Je tu vzdy - aj ked hudba prave nehra, aby si ju
// host vedel zapnut (a aby vedel, ze tu vobec je).
export const AudioToggle = () => {
  const { playing, toggle } = useAmbientAudio();
  const label = playing ? 'Stíšiť hudbu' : 'Zapnúť hudbu';

  return (
    <button
      type="button"
      className={`audio-toggle${playing ? ' audio-toggle--on' : ''}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={label}
      title={label}
    >
      <span className="audio-toggle__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
};
