export type Props = {
  fieldId: string;
  fieldValue: string;
  subPropertyKey: any;
};

export function createGeneralStore() {
  return {
    popupIsActive: false,

    setPopupIsActive(popupStatus: boolean) {
      this.popupIsActive = popupStatus;
    },
  };
}
