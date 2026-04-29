import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { headerData } from './HeaderData';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};


	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				closeMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuRef]);

	return (
		<div className="header">
			<div className="container-fluid">
				<div className="header-wrapper">
					{/* Header Logo */}
					<div className="header-logo">
						<h2>
							<Link href="/">{headerData.logo}</Link>
						</h2>
					</div>
					{/* Header Nav */}
					<div className="header-nav">
						<Link className="button button-sm button-dot me-2 me-lg-3" href="/#contact">
							<span data-text="Let's Talk">Let&apos;s Talk</span>
						</Link>
						{/* Nav Menu Toggle */}
						<button type="button" onClick={toggleMenu} className="button button-sm button-dot button-white">
							<span data-text="Menu">Menu</span>
						</button>
						{/* Nav Menu Box */}
						<div ref={menuRef} className={`nav-box ${isMenuOpen ? 'show' : ''}`}>
							<ul className="nav">
								<li className="nav-item">
									<Link className="nav-link" href="/#about"><i className="bi bi-arrow-right"></i>About</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/#services"><i className="bi bi-arrow-right"></i>Services</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/#portfolio"><i className="bi bi-arrow-right"></i>Portfolio</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/#awards"><i className="bi bi-arrow-right"></i>Experience</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/#testimonial"><i className="bi bi-arrow-right"></i>Testimonial</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/#blog"><i className="bi bi-arrow-right"></i>Blog</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/#contact"><i className="bi bi-arrow-right"></i>Contact</Link>
								</li>
							</ul>
						</div>
					</div> {/* end header-nav */}
				</div> {/* end header-wrapper */}
			</div> {/* end container */}
		</div>
	);
};

export default Header;
