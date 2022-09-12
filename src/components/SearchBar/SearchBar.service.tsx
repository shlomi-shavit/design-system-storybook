import { t } from 'i18next';

const useService = () => {
  const searchBarFieldsData = {
    regions: t( 'searchBar.dropdownOptions', { returnObjects: true } ),
    categories: t( 'searchBar.dropdownOptions', { returnObjects: true } ),
  };

  return {
    searchBarFieldsData,
    t,
  };
};

export default useService;
