import './OurStory.less';

export const OurStory = () => (
  <section className="story" id="story">
    <div className="panel story__grid">
      <div className="story__text">
        <p className="eyebrow reveal">Náš príbeh</p>
        <h2 className="h2 reveal">Dve cesty s jedným šťastným koncom</h2>
        <p className="story__body reveal">
          Spoznali sme sa tak ako Vás na našu svadbu pozývame - cez internet. Neúprosne plynúci čas a samota prinútili
          aj nás uchýliť sa k zoznamkám.
        </p>
        <p className="story__body reveal">
          Jeden z nás tam triedil roky zrno od pliev ako popoluška, kým ten druhý došiel a našiel hotovú princeznu.
        </p>
        <p className="story__body reveal">
          Dva roky na to tu teraz čítate náš príbeh, ktorý je dôkazom toho, že aj v dnešnej dobe plnej digitálnych
          vzťahov sa môže stať, že nájdete niekoho, kto vám úplne zmení život na internete. A my sme našli jeden
          druhého.
        </p>
        <blockquote className="story__quote reveal">
          „A zrazu sme vedeli, že vesmír bol stvorený, aby sa naše duše stretli."
        </blockquote>
      </div>
      <figure className="story__photo reveal">
        <div className="story__photo-frame" data-photo="story" />
        <figcaption>Svadobný stan, 4.6.2027</figcaption>
      </figure>
    </div>
  </section>
);
