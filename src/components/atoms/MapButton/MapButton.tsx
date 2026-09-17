import { Button } from '@atoms/Button/Button';
import { Icon } from '@atoms/Icon/Icon';
import './MapButton.less';

export interface MapButtonProps {
  href: string;
  label?: string;
}

// Jedina vyrazna akcia v sekcii - destinacia sa nesmie stratit medzi tichymi
// kartami. Mapu otvarame odkazom, nie vnorenym iframe.
export const MapButton = ({ href, label = 'Zobraziť na mape' }: MapButtonProps) => (
  <span className="map-button">
    <Button href={href} variant="solid" external>
      <Icon name="pin" className="map-button__pin" />
      {label}
    </Button>
  </span>
);
