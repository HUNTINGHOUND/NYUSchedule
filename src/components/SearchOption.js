import React from 'react';

class SearchOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term_code: 0,
      acad_group: '',
      subject: '',
      catalog_nbr: 0,
      keyword: '',
      class_nbr: '',
      nyu_location: ''
    }
  }
}
