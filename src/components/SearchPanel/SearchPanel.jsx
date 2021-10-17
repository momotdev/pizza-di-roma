import React, {useState} from 'react';
import classes from './SearchPanel.module.css';
import DefaultButton from "../UI/DefaultButton/DefaultButton";

const SearchPanel = ({sortProducts}) => {
	const [search, setSearch] = useState({
		type: [],
		enabled: []
	})


	const toggleSearchArrayValue = (array, value) => {
		let resultArray = [];
		if (search[array].some(item => item === value)) {
			resultArray = search[array].filter((item) => item !== value)
		} else {
			resultArray = search[array];
			resultArray.push(value);
		}

		sortProducts(Object.assign({}, search, {[array]: resultArray}))
		setSearch(Object.assign({}, search, {[array]: resultArray}));
	}


	return (
		<div className={classes['search-panel']}>
			<div>
				<span className={classes.label}>Type: </span>
				<DefaultButton
					active={search.type.some((item) => item === 'PIZZA')}
					onClick={() => toggleSearchArrayValue('type', 'PIZZA')}>PIZZA</DefaultButton>
				<DefaultButton
					active={search.type.some((item) => item === 'SUSHI')}
					onClick={() => toggleSearchArrayValue('type', 'SUSHI')}>SUSHI</DefaultButton>
				<DefaultButton
					active={search.type.some((item) => item === 'OTHER')}
					onClick={() => toggleSearchArrayValue('type', 'OTHER')}>OTHER</DefaultButton>
			</div>

			<div>
				<span className={classes.label}>Enabled: </span>
				<DefaultButton active={search.enabled.some((item) => item === true)}
							   onClick={() => toggleSearchArrayValue('enabled', true)}>ENABLED</DefaultButton>
				<DefaultButton active={search.enabled.some((item) => item === false)}
							   onClick={() => toggleSearchArrayValue('enabled', false)}>DISABLED</DefaultButton>
			</div>
		</div>
	);
};

export default SearchPanel;