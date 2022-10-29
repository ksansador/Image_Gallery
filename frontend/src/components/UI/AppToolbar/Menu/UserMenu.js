import {useState} from "react";
import * as React from 'react';
import {useDispatch} from "react-redux";
import {logOutRequest} from "../../../../store/actions/usersActions";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Hello, {user.displayName}!
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {user?.role === 'admin' &&
                    <MenuItem onClick={handleClose}>
                        <Link to={`/requests`} style={{color: 'inherit',
                            textDecoration: 'none',
                            '&:hover': {
                                color: 'inherit'
                            }}}>
                            Requests
                        </Link>
                    </MenuItem>
                }
                <MenuItem onClick={handleClose}>
                    <Link to={`/users/${user._id}`} style={{color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                            color: 'inherit'
                        }}}>
                        My pictures
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to={`/cards/new`} style={{color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                            color: 'inherit'
                        }}}>
                        Add new card
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => dispatch(logOutRequest(user))}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
