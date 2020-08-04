import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Pagination(props) {
	const pageNumbers = [];

	for (
		let i = 1;
		i <= Math.ceil(props.totalCharacters / props.charactersPerPage);
		i++
	) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className='pagination'>
				{pageNumbers.map(number => (
					<li key={number} className='page-item'>
						<a
							onClick={() => props.paginate(number)}
							onChange={() => props.getCharacterData(number)}
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
