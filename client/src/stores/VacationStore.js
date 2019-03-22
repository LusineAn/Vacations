import Immutable from 'immutable';
import {extendObservable, action, computed} from 'mobx';
// import _ from 'lodash';

import M from '../Messages';

class VacationStore {

    constructor() {
        extendObservable(this, this.getDefaultStoreProps());
    }

    getDefaultStoreProps() {
        return {
            assets: Immutable.List(),
            selectedAsset: Immutable.Map(),
            assetsForDeletion: Immutable.List(),
            filterType: ASSET_MANAGER.ASSET_TYPES.ALL,
            sortDirection: ASSET_MANAGER.SORT_TYPES.ASC,
            sortAttribute: AMCONFIG.defaultSortAttribute,
            filterText: '',
            accountUsage: 0,
            filesForUpload: Immutable.List(),
            errorsList: Immutable.List(),
            fileForUpdate: null,
            showInfoIntro: true
        };
    }

    @computed
    get filteredProjects() {
        let assets = this.assets;

        if (this.filterType !== ASSET_MANAGER.ASSET_TYPES.ALL) {
            assets = assets.filter(asset => asset.get('fileType') === this.filterType);
        }

        if (this.sortAttribute) {
            assets = assets.sortBy(asset => asset.get(this.sortAttribute));
            if (this.sortDirection === ASSET_MANAGER.SORT_TYPES.DESC) {
                assets = assets.reverse();
            }
        }

        if (this.filterText !== '') {
            assets = assets.filter(asset => asset.get('name').search(this.filterText) > -1);
        }
        return assets;
    };
}

export {VacationStore};