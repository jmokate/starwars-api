import React from "react";

function Pagination(props) {
	const pageNumbers = [];
	let number;

	for (
		let i = 1;
		i <= Math.ceil(props.totalCharacters / props.charactersPerPage);
		i++
	) {
		pageNumbers.push(i);
		number = pageNumbers[i];
	}

	return (
		<nav>
			<ul className='pagination'>
				{pageNumbers.map(number => (
					<li key={number} className='page-item'>
						<a
							onClick={() => props.paginate(number)}
							onChange={() => props.getCharacterData(number)}
							href='!#'
							className='page-link'
						>
							{number}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Pagination;
