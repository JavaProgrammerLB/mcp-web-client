import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';
import SearchWindow from './SearchWindow';


const Header: React.FC = () => {
	const { logout, user, isAuthenticated } = useAuth0();
	const navigate = useNavigate();
	const location = useLocation();
	const { isDarkMode, theme, setTheme } = useTheme();
	const [showDropdown, setShowDropdown] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [showSearchWindow, setShowSearchWindow] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Handle clicking outside the dropdown or mobile menu
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowDropdown(false);
			}
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
				setMobileMenuOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className={`${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-100'} border-b sticky top-0 z-50`}>
			<div className="max-w-full mx-4 sm:mx-6 lg:mx-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-8">
					<div
						className="flex items-center cursor-pointer"
						onClick={() => navigate('/')}
					>
						<Logo />
						<h1 className={`ml-3 text-lg font-light ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>y-mcp</h1>
					</div>

						{/* Navigation links - hidden on mobile */}
						<div className="hidden md:flex items-center space-x-6">
							<button
								onClick={() => navigate('/')}
								className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
							>
								Chat
							</button>

							<button
								onClick={() => navigate('/settings')}
								className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
							>
								Settings
							</button>
						</div>

						{/* Mobile menu button - visible only on mobile */}
						<div className="md:hidden">
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-2 rounded-md focus:outline-none`}
							>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									{mobileMenuOpen ? (
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									) : (
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
									)}
								</svg>
							</button>
						</div>
					</div>

					{/* Mobile menu - only visible when open */}
					{mobileMenuOpen && (
						<div
							ref={mobileMenuRef}
							className={`absolute top-16 left-0 right-0 z-50 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-100'} border-b shadow-lg md:hidden`}
						>
							<div className="px-4 py-3 space-y-2">
								<button
									onClick={() => {
										navigate('/');
										setMobileMenuOpen(false);
									}}
									className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded px-3 transition-colors`}
								>
									Chat
								</button>
								<button
									onClick={() => {
										navigate('/settings');
										setMobileMenuOpen(false);
									}}
									className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded px-3 transition-colors`}
								>
									Settings
								</button>
							</div>
						</div>
					)}

					{/* Right side icons and dropdown */}
					<div className="flex items-center space-x-3">
						{/* History button */}
						<button
							onClick={() => setShowSearchWindow(true)}
							className={`${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} p-2 rounded-full transition-colors flex items-center`}
							aria-label="Search History"
						>
							<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</button>
						{/* GitHub link */}
						<a
							href="https://github.com/luohy15/y-gui"
							target="_blank"
							rel="noopener noreferrer"
							className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
							aria-label="GitHub repository"
						>
							<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.455 4.865 20.127 8.84 21.594C9.34 21.684 9.52 21.383 9.52 21.125C9.52 20.895 9.513 20.244 9.51 19.382C6.73 19.991 6.14 18.077 6.14 18.077C5.685 16.909 5.029 16.611 5.029 16.611C4.139 15.973 5.096 15.986 5.096 15.986C6.084 16.052 6.613 17.017 6.613 17.017C7.5 18.56 8.97 18.121 9.54 17.878C9.629 17.188 9.889 16.749 10.175 16.497C7.954 16.243 5.62 15.38 5.62 11.548C5.62 10.425 6.01 9.51 6.632 8.796C6.532 8.553 6.192 7.611 6.732 6.212C6.732 6.212 7.562 5.95 9.5 7.266C10.29 7.047 11.14 6.938 11.99 6.934C12.84 6.938 13.69 7.047 14.48 7.266C16.418 5.95 17.248 6.212 17.248 6.212C17.788 7.611 17.448 8.553 17.348 8.796C17.97 9.51 18.36 10.425 18.36 11.548C18.36 15.391 16.023 16.239 13.795 16.489C14.165 16.801 14.495 17.419 14.495 18.358C14.495 19.708 14.484 20.808 14.484 21.125C14.484 21.386 14.664 21.69 15.174 21.594C19.145 20.127 22.007 16.456 22.007 12.017C22.007 6.484 17.53 2 12.007 2H12Z" />
							</svg>
						</a>
						{/* Right side dropdown */}
						<div className="relative" ref={dropdownRef}>
						<button
							onMouseEnter={() => setShowDropdown(true)}
							onMouseLeave={() => {
								timeoutRef.current = setTimeout(() => setShowDropdown(false), 100);
							}}
							className={`${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} p-2 rounded-full transition-colors flex items-center`}
						>
							{/* User avatar (if authenticated) */}
							{isAuthenticated && user?.picture && (
								<div className="flex items-center">
									<img
										src={user.picture}
										alt="User Avatar"
										className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
									/>
								</div>
							)}
						</button>

						{showDropdown && (
							<div
								onMouseEnter={() => {
									if (timeoutRef.current) {
										clearTimeout(timeoutRef.current);
										timeoutRef.current = null;
									}
									setShowDropdown(true);
								}}
								onMouseLeave={() => setShowDropdown(false)}
								className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} ring-1 ring-black ring-opacity-5 z-50`}
							>
								{/* Theme options */}
								<div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
									<p className="font-medium mb-2">Theme</p>
									<div className="flex flex-col space-y-2">
										<button
											onClick={() => setTheme('light')}
											className={`flex items-center space-x-2 ${theme === 'light' ? 'text-blue-500' : ''}`}
										>
											<svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
											</svg>
											<span>Light</span>
										</button>
										<button
											onClick={() => setTheme('dark')}
											className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-blue-500' : ''}`}
										>
											<svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
												<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
											</svg>
											<span>Dark</span>
										</button>
										<button
											onClick={() => setTheme('system')}
											className={`flex items-center space-x-2 ${theme === 'system' ? 'text-blue-500' : ''}`}
										>
											<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
											<span>System</span>
										</button>
									</div>
								</div>

								{/* Sign out option */}
								<button
									onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
									className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
								>
									<div className="flex items-center space-x-2">
										<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
										</svg>
										<span>Sign out</span>
									</div>
								</button>
							</div>
						)}
						</div>
					</div>
				</div>
			</div>

			{/* Search Window */}
			<SearchWindow isOpen={showSearchWindow} onClose={() => setShowSearchWindow(false)} />
		</header>
	);
};

export default Header;
