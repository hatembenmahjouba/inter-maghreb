import React from 'react';
import { ReactComponent as Heart } from '../assets/img/SVG/heart-outlined.svg';
import { ReactComponent as Camion } from '../assets/img/SVG/camion-de-livraison-logistique-en-mouvement.svg';
import { ReactComponent as Services } from '../assets/img/SVG/service-telephonique-24h-24.svg';

const HomeFeatures = () => (
  <div className='features'>
    <div className='feature'>
      <Camion className='feature__icon' />

      <h4 className='heading-4'>LIVRAISON OFFERTE PARTOUT EN TUNISIE</h4>
      <p className='feature__text'>
        Notre service de livraison est disponible 7/7 et partout sur le
        territoire Tunisien. De plus, grâce à notre stock disponible sur place,
        vos commandes de meubles vous seront livrées en quelques jours
        seulement.
      </p>
    </div>
    <div className='feature'>
      <Heart className='feature__icon' />

      <h4 className='heading-4'>EXCELLENT RAPPORT QUALITÉ / PRIX</h4>
      <p className='feature__text'>
        Les meubles INTERMAGHREB sont avant tout très bon marché et accessibles
        à tous. Robustes et d’une qualité irréprochable, en commandant nos
        produits, vous êtes assuré d’obtenir le meilleur rapport qualité / prix
        de mobilier en Tunisie.
      </p>
    </div>
    <div className='feature'>
      <Services className='feature__icon' />

      <h4 className='heading-4'>SERVICE APRES VENTE DISPONIBLE 7 / 7</h4>
      <p className='feature__text'>
        Pour toutes vos commandes passées en ligne ou à travers nos Show Room,
        vous aurez la privilège de contacter notre service clientèle ou celui
        d’après vente 7 jours sur 7, pour encore plus de flexibilité et de
        sérénité. Une garantie sure à 100% pour vos achats de meubles.
      </p>
    </div>
  </div>
);

export default HomeFeatures;
