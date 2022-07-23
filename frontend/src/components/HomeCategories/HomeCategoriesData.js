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
    name: 'Office',
    link: '/categories/office',
  },
  {
    images: [rayonnageSmall, rayonnageMedium, rayonnageLarge],
    name: 'Storage',
    link: '/categories/storage',
  },
  {
    images: [universitaireSmall, universitaireMedium, universitaireLarge],
    name: 'University',
    link: '/categories/university',
  },
  {
    images: [scolaireSmall, scolaireMedium, scolaireLarge],
    name: 'School',
    link: '/categories/school',
  },
];

export default HOMECATEGORIESDATA;
