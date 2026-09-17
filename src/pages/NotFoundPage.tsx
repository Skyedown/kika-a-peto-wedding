import { Grain } from '@atoms/Grain/Grain';
import { Button } from '@atoms/Button/Button';
import './NotFoundPage.less';

// Styled 404 — used for unknown routes and unknown invite slugs.
export const NotFoundPage = () => (
  <>
    <Grain />
    <section className="notfound">
      <div className="notfound__card">
        <p className="notfound__eyebrow">Pozvánka nenájdená</p>
        <h1 className="notfound__title">Ups…</h1>
        <p className="notfound__text">
          Túto stránku sa nám nepodarilo nájsť. Skontrolujte prosím odkaz, ktorý sme vám poslali.
        </p>
        <Button href="/" variant="solid">
          Pozrieť svadobný web
        </Button>
      </div>
    </section>
  </>
);
