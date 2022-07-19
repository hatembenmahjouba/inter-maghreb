import bureauSmall from '../../assets/img/bureau-small.jpg';
import bureauMedium from '../../assets/img/bureau-medium.jpg';
import bureauLarge from '../../assets/img/bureau-large.jpg';
import rayonnageSmall from '../../assets/img/rayonnage-small.jpg';
import rayonnageMedium from '../../assets/img/rayonnage-medium.jpg';
import rayonnageLarge from '../../assets/img/rayonnage-large.jpg';
import universitaireSmall from '../../assets/img/universitaire-small.jpg';
import universitaireMedium from '../../assets/img/universitaire-medium.jpg';
import universitaireLarge from '../../assets/img/universitaire-large.jpg';
import scolaireSmall from '../../assets/img/scolaire-small.jpg';
import scolaireMedium from '../../assets/img/scolaire-medium.jpg';
import scolaireLarge from '../../assets/img/scolaire-large.jpg';
const HOMECATEGORIESDATA = [
  {
    images: [bureauSmall, bureauMedium, bureauLarge],
    name: 'Bureau',
    link: '/categories/bureau',
  },
  {
    images: [rayonnageSmall, rayonnageMedium, rayonnageLarge],
    name: 'Rayonnage',
    link: '/categories/rayonnage',
  },
  {
    images: [universitaireSmall, universitaireMedium, universitaireLarge],
    name: 'Universitaire',
    link: '/categories/universitaire',
  },
  {
    images: [scolaireSmall, scolaireMedium, scolaireLarge],
    name: 'Scolaire',
    link: '/categories/scolaire',
  },
];

export default HOMECATEGORIESDATA;
