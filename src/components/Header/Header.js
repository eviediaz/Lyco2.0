import React from 'react'
import { useStyles } from './style';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Menu, MenuItem, Avatar } from "@material-ui/core";
import { Add, Apps } from "@material-ui/icons";
import { CreateClass } from '../index';
import { useLocalContext } from '../../context/context';

const Header = ({children}) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const { createClassDialog, setCreateClassDialog } = useLocalContext();

    const handleCreate = () => {
        handleClose();
        setCreateClassDialog(true);
    }


    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.headerWrapper}>
                        {children}
                        <img className="homePageLogo"
                            src="/logo.png"
                            alt="Lyco"
                        />
                        <Typography variant="h6" className={classes.title}>
                            Lyco
                        </Typography>
                    </div>
                    <div className={classes.header__wrapper__right}>
                        <Add onClick={handleClick} className={classes.icon}/>
                        <Apps className={classes.icon}/>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem>Join Class</MenuItem>
                            <MenuItem onClick = {handleCreate} >Create Class</MenuItem>
                        </Menu>
                        <div>
                            <Avatar className={classes.icon}/>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <CreateClass/>
        </div>
    );
};

export default Header;