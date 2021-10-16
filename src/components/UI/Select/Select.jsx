import React, {useEffect, useState} from 'react';

const Select = ({options, selectedValue, style, onValueChange, ...props}) => {
	const [currentValue, setCurrentValue] = useState('');

	useEffect(() => {
		setCurrentValue(selectedValue);
	},[selectedValue])

	return (
		<select className={style} value={currentValue} {...props} onChange={event => {
			console.log("change in select")
			onValueChange(event.target.value);
			setCurrentValue(event.target.value);
		}}>
			{options.map(option => (
				<option key={option.value} value={option.value}>{option.value}</option>
			))}
		</select>
	);
};

export default Select;