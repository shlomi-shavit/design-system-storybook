export type Props = {
  fieldId: string;
  fieldValue: string;
  subPropertyKey: any;
};

export function createSearchBarStore() {
  return {
    partnerData: [],
    searchBarValues: [] as Props[],
    brandsResults: [],
    showSearchBarResults: false,
    partnerId: undefined as number | undefined,
    popupIsActive: false,

    setPopupIsActive( popupStatus: boolean ) {
      this.popupIsActive = popupStatus;
    },
    setPartnerId( partnerId?: number ) {
      this.partnerId = partnerId;
    },
    setShowSearchBarResults() {
      this.showSearchBarResults = !this.showSearchBarResults;
    },
    setBrandsResults( results: any ) {
      this.brandsResults = results;
    },
    setPartnerData( partnerData: any ) {
      this.partnerData = partnerData;
    },

    setSelectedField( fieldId: string, fieldValue: string ) {
      const setSubPropertyKey = () => {
        switch ( fieldId ) {
        case 'category':
          return 'categories_on_brands';
        case 'region':
          return 'supplier_regions';
        case 'searchTerm':
          return 'title';
        default:
        }
      };
      const subPropertyKey = setSubPropertyKey();
      const fieldIndex = ( fieldId: string ) => this.searchBarValues.findIndex(
        ( fieldData: any ) => fieldData.fieldId === fieldId );

      if ( fieldIndex( fieldId ) === -1 ) {
        this.searchBarValues.push( { fieldId, fieldValue, subPropertyKey } );
      } else {
        this.searchBarValues[fieldIndex( fieldId )].fieldValue = fieldValue;
      }
    },
    removeSelectedField( id: string ) {
      if ( id ) {
        this.searchBarValues = this.searchBarValues.filter( ( field: any ) => field.fieldId !== id );
      }
    },
    clearAllFields() {
      this.searchBarValues = [];
    },
  };
}
