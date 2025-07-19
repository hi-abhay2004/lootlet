"use client"
import React, { useState, useEffect } from 'react';
import styles from './Header.module.css'; // Import CSS Modules
import { AppBar, Toolbar, InputBase, IconButton, Badge, Typography, Modal, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useCart } from '../../../context/CartContext';
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const { cart } = useCart();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <AppBar position="static" className={styles.navbar}>
                <Toolbar className="flex flex-row justify-between items-center min-h-0 w-full px-0 gap-2">
                    {/* Logo */}
                    <Link href="/">
                      <img src="/lootlet.png" alt="Logo" className={styles.logo + " h-7 sm:h-8 md:h-10 cursor-pointer"} />
                    </Link>

                    {/* Desktop Search Bar (hidden on mobile, only show if not on /search) */}
                    {router.pathname !== '/search' && (
                      <div className={styles.search + " hidden sm:flex flex-1 mx-2 sm:mx-4 max-w-xs sm:max-w-md items-center border border-gray-300 rounded-md px-2 h-8 sm:h-10"}>
                          <SearchIcon sx={{color:'black',m:1}}/>
                          <form
                            onSubmit={e => {
                              e.preventDefault();
                              if (searchValue.trim()) {
                                router.push(`/search?q=${encodeURIComponent(searchValue)}`);
                              }
                            }}
                            className="w-full"
                          >
                            <InputBase
                              placeholder="Search for Products, Brands and More"
                              classes={{
                                  root: styles.inputRoot,
                                  input: styles.inputInput,
                              }}
                              className="w-full text-xs sm:text-sm"
                              inputProps={{ 'aria-label': 'search' }}
                              value={searchValue}
                              onChange={e => setSearchValue(e.target.value)}
                            />
                          </form>
                      </div>
                    )}

                    {/* Right Icons */}
                    <div className="flex flex-row items-center gap-2 sm:gap-4 ml-auto">
                        {/* Mobile Only: Search & Profile */}
                        <div className="flex sm:hidden flex-row items-center gap-2">
                            <IconButton onClick={handleOpen}>
                                <SearchIcon sx={{ color: 'black' }} />
                            </IconButton>
                            <IconButton onClick={() => setProfileMenuOpen(true)}>
                                <AccountCircleOutlinedIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </div>
                        {/* Desktop Only: All icons as before */}
                        <div className="hidden sm:flex flex-row items-center gap-4">
                            <IconButton aria-label="login">
                              <SignedOut>
                                <Typography className='p-2 text-black' component="a" href="/components/login">Login</Typography>
                              </SignedOut>
                              <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                                <Typography className='p-2 text-black' component="a" href="/account">Account</Typography>
                              </SignedIn>
                            </IconButton>
                            <IconButton aria-label="cart" href="/cart">
                                <Badge badgeContent={cart.length} sx={{ color: 'black' }}>
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                                <Typography className='p-2 text-black'>Cart</Typography>
                            </IconButton>
                            <IconButton aria-label="seller">
                                <StorefrontOutlinedIcon/>
                                <Typography className='p-2 text-black'>Become a Seller</Typography>
                            </IconButton>
                            <IconButton aria-label="orders" href="/orders">
                                <Badge sx={{ color: 'black' }}>
                                    <AccountCircleOutlinedIcon />
                                </Badge>
                                <Typography className='p-2 text-black'>My Orders</Typography>
                            </IconButton>
                            <IconButton edge="end" aria-label="more" onClick={handleOpen}>
                                <MoreIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Mobile Search Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    ...modalStyle,
                    top: 0,
                    left: 0,
                    transform: 'none',
                    width: '100vw',
                    borderRadius: 0,
                    p: 0,
                    zIndex: 1301,
                    height: 'auto',
                }}>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            if (searchValue.trim()) {
                                router.push(`/search?q=${encodeURIComponent(searchValue)}`);
                                handleClose();
                            }
                        }}
                        className="flex items-center w-full border-b px-4 py-3 bg-white"
                    >
                        <SearchIcon sx={{ mr: 1 }} />
                        <InputBase
                            placeholder="Search for Products, Brands and More"
                            autoFocus
                            fullWidth
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            className="text-base"
                        />
                    </form>
                </Box>
            </Modal>

            {/* Profile Menu (dropdown) for mobile only */}
            <Modal open={profileMenuOpen} onClose={() => setProfileMenuOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: 60,
                    right: 10,
                    width: 220,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: 2,
                    zIndex: 1400,
                }}>
                    <div className="flex flex-col">
                        <button onClick={() => {router.push('/account'); setProfileMenuOpen(false);}} className="text-left py-2 px-3 hover:bg-gray-100 rounded">My Profile</button>
                        <button onClick={() => {router.push('/orders'); setProfileMenuOpen(false);}} className="text-left py-2 px-3 hover:bg-gray-100 rounded">My Orders</button>
                        <button onClick={() => {router.push('/cart'); setProfileMenuOpen(false);}} className="text-left py-2 px-3 hover:bg-gray-100 rounded">My Cart</button>
                        <div className="border-t my-2" />
                        <SignedOut>
                          <button onClick={() => {router.push('/components/login'); setProfileMenuOpen(false);}} className="text-left py-2 px-3 hover:bg-gray-100 rounded">Login</button>
                        </SignedOut>
                        <SignedIn>
                          <button onClick={() => {router.push('/'); setProfileMenuOpen(false);}} className="text-left py-2 px-3 hover:bg-gray-100 rounded">Logout</button>
                        </SignedIn>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default Header;

/* ✅ Modal Styling */
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 760,
    height:520,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px'
};
