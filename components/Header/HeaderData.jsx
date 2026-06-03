import Image from 'next/image';
import IMG_LOGO from '../../public/images/logoA.png';

export const headerData = {
    logo: 
    <div className="logo d-flex align-items-center gap-2">
        <Image 
        className="logo-img"
        src={IMG_LOGO} alt="Logo" width={30} height={30} />
        <span className="d-none d-sm-block">Abdallah Ashraf Studio</span>
    </div>,
};
