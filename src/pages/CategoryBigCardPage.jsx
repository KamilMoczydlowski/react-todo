import { useLocation } from 'react-router-dom';

import CategoryCardBig from "../components/cardBig/CategoryCardBig";

const CategoryBigCardPage = (props) => {

	const location = useLocation()
	
	return <CategoryCardBig clickedTileId={location.state.id} />;
};

export default CategoryBigCardPage;