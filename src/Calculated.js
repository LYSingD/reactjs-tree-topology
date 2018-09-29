import React from 'react';

// Create the accounts objects to store each account's information
function Accounts_info(account, total_area, total_time, productivity) {
	this.account = account;
	this.total_area = total_area;
	this.total_time = total_time;
	this.productivity = productivity;
}

function CombineChildren(parent_id, parent_account, accounts, relation_accounts) {
	const p_id = parent_id;
	const parent = parent_account;
	const account = accounts;
	const relation_account = relation_accounts;
	let child_account;

	if (relation_account.length !== 0) {
		relation_account.forEach((acc) => {
			if (acc.parent === p_id) {
				child_account = account.find(function (obj) {
					return obj.account === acc.id;
				});
				
				CombineChildren(acc.id, child_account, account, relation_accounts.slice(1))
				
				parent.total_area += child_account.total_area;
				parent.total_time += child_account.total_time;
				parent.productivity += child_account.productivity;
			};
		});
	}

	return (
		null
	)
}

function GenerateAccounts(props) {
	const accounts = props.accounts;
	const relation_accounts = props.relation_accounts;
	const accounts_stored = props.account_stored;

	relation_accounts.forEach((acc) => {
		if (!(accounts_stored.includes(acc.id))) {
			accounts_stored.push(acc.id)
			let new_acc = new Accounts_info(acc.id, 0, 0, 0);
			accounts.push(new_acc);
		} 
	});

	accounts.sort(function (a,b) {
		return a.account - b.account;
	});

	relation_accounts.forEach((acc) => {
		if(acc.parent === null) {
			const parent_id = acc.id;
			const parent_account = accounts.find(function (obj) {
				return obj.account === parent_id;
			});
			CombineChildren(parent_id, parent_account, accounts, relation_accounts.slice(1));
		}
	});

	return (
		accounts.map((acc) => (
			<tr key={acc.total_area}>
				<td>
					{acc.account}
				</td>	
				<td>
					{acc.total_area}
				</td>
				<td>
					{acc.total_time}
				</td>
				<td>
					{acc.productivity}
				</td>
			</tr>		
		))
	);
}

function AccountInfo(props) {
	const accounts_clean = props.accounts_clean;
	const relation_accounts = props.relation_accounts;
	const accounts = [];
	const account_stored = [];
	accounts_clean.forEach((acc) => {
		if (account_stored.includes(acc.account)) {
			accounts.forEach((acc2) => {
				if (acc.account === acc2.account) {
					acc2.total_area = acc2.total_area + acc.area;
					acc2.total_time = acc2.total_time + acc.time;
					acc2.productivity = acc2.productivity + (acc.area / acc.time);
				}
			});
		} else {
			account_stored.push(acc.account);
			let cur_acc = new Accounts_info(acc.account, acc.area, acc.time, (acc.area / acc.time));
			accounts.push(cur_acc);
			
		}
	});
	const content = <GenerateAccounts 
						accounts = {accounts} 
						relation_accounts={relation_accounts}
						account_stored = {account_stored}
					/>
	return (
		<tbody>
		
			{content}
		
		</tbody>
	);

}

function Calculated(props) {
	let layout = <AccountInfo accounts_clean={props.accounts_clean} relation_accounts={props.accounts}/>;
	return (
			<div>
				<table>
					<tbody>
						<tr>
							<th>Accounts</th>
							<th>Total Area Cleaned</th>
							<th>Total Time</th>
							<th>Productivity</th>
						</tr>
					</tbody>
						
						{layout}
					
				</table>
			</div>
		);
}

export default Calculated;