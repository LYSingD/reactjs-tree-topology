import React from 'react';
import {getAccounts} from './data';
import {getCleanings} from './data';
import Calculated from './Calculated';


function FindChildren(props) {
	const new_account = props.new_accounts;
	const parent_id = props.parent_id;
	const children = [];
	if (new_account.length !== 0){
		new_account.forEach((acc) => {
			if (acc.parent === parent_id) {
				children.push(
					<li key={acc.id}>
						{acc.name}
					</li>
					
				);
				children.push(
					<FindChildren parent_id={acc.id} new_accounts={new_account.slice(1)} />
				);
			}
		});
	}
	return (
			<ul>{children}</ul>
			
		);
}

function TreeExpanded(props) {
	const accounts = props.account;
	const rows = [];
	accounts.forEach((acc) => {
		if(acc.parent === null) {
			let parent_id = acc.id;
			rows.push(
				<div key={acc.id}>
					<p>{acc.name}</p>
				</div>
			);
			rows.push(
				<FindChildren parent_id={parent_id} new_accounts={accounts.slice(1)}/>
			);
		} 
	});

	return (
		<div>
			{rows}
		</div>
	);
}

function TreeCollapsed(props) {
	let accounts = props.account;
	const content = accounts.map((acc) => acc.parent === null ?
			(		
				<div key={acc.id}>
					<p>{acc.name}</p>
				</div>
			) : (null)
	);
	return (
		<div>
			{content}
		</div>
	);
}

function Collapsed(props) {
	return (
		<button onClick={props.onClick}>
			Collapse All
		</button>
	)
}

function Expanded(props) {
	return (
		<button onClick={props.onClick}>
			Expand All
		</button>
	)
}

class Control extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
						isExpanded: true,
						accounts: getAccounts(),
						account_clean : getCleanings()
					};
	}

	handleCollapsedClick() {
		this.setState({isExpanded: false})
	}

	handleExpandClick() {
		this.setState({isExpanded: true});
	}

    render() {
    	const isExpanded = this.state.isExpanded;
    	let button;
    	let layout;
    	let table = <Calculated accounts={this.state.accounts} accounts_clean={this.state.account_clean}/>;

    	if (isExpanded) {
    		button = <Collapsed onClick={this.handleCollapsedClick.bind(this)} />;
    		layout = <TreeExpanded account={this.state.accounts} />;
    		

    	} else {
    		button = <Expanded onClick={this.handleExpandClick.bind(this)} />;
    		layout = <TreeCollapsed account={this.state.accounts} />;
    	}

        return (
        	<div>
        		{button}
        		{layout}
        		{table}
        	</div>
    	);
    }
}

export default Control;
