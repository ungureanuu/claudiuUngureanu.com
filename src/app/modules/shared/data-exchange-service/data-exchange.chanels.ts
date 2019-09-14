export interface IDataExchangeServiceChanels {
  TYPE: {
    GENERAL: string;
  };

  EVENTS: {
    WIZARD: {
      NAVIAGTION: string;
    };
    USERS: {
      SAVE_HIERARCHY_COMPANY: string,
      SAVE_HIERARCHY_COACH: string
    };
  };
}

export const comunicationProcess: IDataExchangeServiceChanels = {
  TYPE: {
    GENERAL: 'General'
  },
  EVENTS: {
    WIZARD: {
      NAVIAGTION: 'Navigation'
    },
    USERS: {
      SAVE_HIERARCHY_COMPANY: 'Company',
      SAVE_HIERARCHY_COACH: 'Coach'
    }
  }
};
