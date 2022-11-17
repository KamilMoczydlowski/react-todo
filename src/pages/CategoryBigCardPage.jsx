import { useLocation } from 'react-router-dom';

import CategoryCardBig from "../components/CategoryCardBig";

const CategoryBigCardPage = (props) => {

	const location = useLocation()
	
	return <CategoryCardBig clickedTile={location.state.id} />;
};

export default CategoryBigCardPage;