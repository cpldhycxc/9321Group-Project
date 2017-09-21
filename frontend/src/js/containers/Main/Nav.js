import React from "react";
import Login from '../../components/Login';
import { Link, Switch, Route } from 'react-router-dom';

class Header extends React.Component {
	render(){
		return(
			 <header className='header'>
        		<div className='logo'>
	          		<Link to='/'>
	          		<img src='static/images/steamRlogo.svg' className='logo-icon'/>
		            SteamR
	          		</Link>
       			</div>

      		</header>
	 )
	}
}

class SideBar extends React.Component{
	render() {
		const { path, token } = this.props;
		console.log(path)
		const active = path === '/feeds' ? 'feeds' : (path === '/profile' ? 'profile' : path.match('^/learning-centre') ? 'learning-centre' : path === '/search' ? 'search' :'discover');
		const base_links = [['discover', true], ['search', true], ['profile', false], ['feeds', false], ['learning-centre', false]];
		const links = base_links.filter((e) => e[1] || token).map((e) => e[0]);
		const sideLinks = links.map((link, i) =>
			<li className={link + '-sidebar sidebar ' + (active === link ? 'active' : '')} key={i}>
			<Link to={`/${link}`}>
			<img src={`static/images/${link}.svg`} className={`sidebar-icon`}/>
			  {link.replace('-',' ')}
			</Link>
		</li>)
		return (
			<nav className='side-nav'>
			   <ul>
				 <li className='user'>
				   <Login />
				 </li>
				 {sideLinks}
			 </ul>
		   </nav>
		)

	}
}


export default class Nav extends React.Component {
  render() {
    return(
    	<div>
    	<Header />
		<SideBar path={this.props.path}/>
		</div>
    );
  }
}
