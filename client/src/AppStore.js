// import Immutable from 'immutable';
import {extendObservable, action, computed} from 'mobx';
// import _ from 'lodash';

class AppStore {
    constructor() {
        extendObservable(this, this.getDefaultStoreProps());
    }

    getDefaultStoreProps() {
        return {
            // assets: Immutable.List(),
            // selectedAsset: Immutable.Map(),
            // assetsForDeletion: Immutable.List(),
            // filterType: ASSET_MANAGER.ASSET_TYPES.ALL,
            // sortDirection: ASSET_MANAGER.SORT_TYPES.ASC,
            // sortAttribute: AMCONFIG.defaultSortAttribute,
            filterText: '',
            accountUsage: 0,
            // filesForUpload: Immutable.List(),
            // errorsList: Immutable.List(),
            fileForUpdate: null,
            showInfoIntro: true
        };
    }

//     @computed
//     get filteredAssets() {
//         let assets = this.assets;

//         if (this.filterType !== ASSET_MANAGER.ASSET_TYPES.ALL) {
//             assets = assets.filter(asset => asset.get('fileType') === this.filterType);
//         }

//         if (this.sortAttribute) {
//             assets = assets.sortBy(asset => asset.get(this.sortAttribute));
//             if (this.sortDirection === ASSET_MANAGER.SORT_TYPES.DESC) {
//                 assets = assets.reverse();
//             }
//         }

//         if (this.filterText !== '') {
//             assets = assets.filter(asset => asset.get('name').search(this.filterText) > -1);
//         }
//         return assets;
//     }


//     @computed
//     get isAllSelected() {
//         const nonSelectedAsset = this.assets.find(asset => !asset.get('selected'));
//         return !nonSelectedAsset;
//     }

//     @computed
//     get selectedAssets() {
//         return this.assets.filter(asset => asset.get('selected'));
//     }

//     @action
//     setSelectedAsset(asset) {
//         this.selectedAsset = asset;
//     }

//     @action
//     loadData = async () => {
//         // don't send request if user doesn't have permission
//         if (!User.canAssetsView) {
//             return true;
//         }

//         await this.loadAccountUsageStats();

//         const assets = await AssetsDAO.getAll();
//         this.assets = Immutable.fromJS(this.processAssetsResponse(assets));
//     };

//     @action
//     loadAccountUsageStats = async () => {
//         const accountUsage = await AssetsDAO.getAccountUsage();
//         this.accountUsage = accountUsage.contentSize;
//     };

//     @action
//     setFilterType(filterType) {
//         this.filterType = filterType;
//     }

//     getAssetIndex(assetID) {
//         const assets = this.assets;
//         return assets.findIndex(asset => asset.get('assetId') === assetID);
//     }

//     @action
//     setSortAttribute(sortAttribute) {
//         this.sortAttribute = sortAttribute;
//     }

//     @action
//     setSortDirection(sortDirection) {
//         this.sortDirection = sortDirection;
//     }

//     @action
//     setSelected(isSelected, assetID) {
//         const index = this.getAssetIndex(assetID);
//         this.assets = this.assets.setIn([index, 'selected'], isSelected);
//     }

//     @action
//     selectAllAssets() {
//         this.assets = this.assets.map(asset => asset.set('selected', true));
//     }

//     @action
//     deselectAllAssets() {
//         this.assets = this.assets.map(asset => asset.set('selected', false));
//     }

//     @action
//     setFilterText(filterText) {
//         this.filterText = filterText;

//     }

//     @action
//     setAssetsForDeletion(assets) {
//         this.assetsForDeletion = assets;
//     }

//     @action
//     setAssetForDeletion(asset) {
//         this.assetsForDeletion = Immutable.List(asset);
//     }

//     @action
//     clearAssetFromDeletionList(assetID) {
//         this.assetsForDeletion = this.assetsForDeletion.filter(asset => asset.get('id') !== assetID);
//     }

//     @action
//     removeAssetFromDeletion(asset) {
//         const assetIndex = this.assetsForDeletion.findIndex(assetForDeletion => assetForDeletion.get('assetId') === asset.get('assetId'));
//         this.assetsForDeletion = this.assetsForDeletion.delete(assetIndex);
//     }

//     @action
//     clearAssetsForDeletion() {
//         this.assetsForDeletion = Immutable.List();
//     }

//     getAsset(assetID) {
//         return this.assets.find(asset => asset.get('assetId') === assetID);
//     }

//     processAssetsResponse(assets) {
//         return assets
//             .filter(asset => !asset.isDirectory) // We do not support directories yet
//             .map(asset => {
//                 asset.selected = false;
//                 const assetName = asset.name;
//                 const assetMimeType = asset.mimeType || '';
//                 asset.fileType = getFileType(assetName, assetMimeType);
//                 // Prepend missing HTTPS:// to CDN URLs (so user-copied URL would work in a new tab)
//                 let cdnURL = asset.cdnUrl || '';
//                 if(cdnURL.search(/^\/\//i) > -1) {
//                     cdnURL = `https:${cdnURL}`;
//                     asset.cdnUrl = cdnURL;
//                 }

//                 // Create separate CDN URL just for thumbnail previews etc. (non-visible to user)
//                 //TODO remove replace after fixing https issue
//                 asset.cdnUrlRaw = cdnURL;

//                 const fileExt = getFileNameExtension(asset.assetId);
//                 asset.fileExt = fileExt;

//                 // Bust cache for image files that were updated less than X minutes ago
//                 if(asset.fileType === ASSET_MANAGER.ASSET_TYPES.IMAGE &&
//                     AMCONFIG.extensionsToPreview.indexOf(fileExt) > -1 &&
//                     cdnURL.search(/(https?:)?\/\//i) > -1) {

//                     const THRESHOLD_MINUTES = 10;
//                     const ONE_SEC_IN_MS = 1000;
//                     const SIXTY_SECONDS = 60;

//                     const fileModDate = asset.lastModifiedTime;
//                     const modifiedMinutesAgo = (Date.now() - new Date(fileModDate)) / ONE_SEC_IN_MS / SIXTY_SECONDS;
//                     const bustCache = modifiedMinutesAgo < THRESHOLD_MINUTES;

//                     if(bustCache) {
//                         asset.cdnUrlRaw = `${cdnURL}?wts=${Date.now()}`; // Append random string to bust caching
//                     }
//                 }
//                 return asset;
//             });
//     }

//     @action
//     cleanUploadFiles() {
//         this.filesForUpload = Immutable.List();
//     }

//     @action
//     setFilesForUpload(filesForUpload) {
//         const isValidFiles = this.validateNativeFiles(filesForUpload) &&
//             this.checkAccountUsage(filesForUpload);
//         if (!isValidFiles) {
//             return isValidFiles;
//         }
//         this.filesForUpload = Immutable.fromJS(this.normalizeFileNames(filesForUpload));
//         return this.filesForUpload;
//     }

//     checkAccountUsage(files) {
//         let total = 0;
//         files.forEach(file => {
//             total += file.size;
//         });
//         const hasSpace = (total <= ASSET_MANAGER.ACCOUNT_SIZE_LIMIT - this.accountUsage);
//         if (!hasSpace) {
//             this.setError(ASSET_MANAGER.ERR_CODES.ERR_UPLOADING_NEW_ASSETS, M.get('assetsManager.errors.NOT_ENOUGH_SPACE'));
//         }
//         return hasSpace;
//     }

//     @action
//     removeFile(fileForRemove) {
//         const index = this.filesForUpload.findIndex(file => file.get('fileName') === fileForRemove.get('fileName'));
//         this.filesForUpload = this.filesForUpload.delete(index);
//     }

//     @action
//     assetDeleteCallback(response) {
//         const deletedAssetId = response.match(/\[(.*)\]/)[1];
//         const deletedIndex = this.assets.findIndex(asset => asset.get('assetId') === deletedAssetId);
//         this.assets = this.assets.delete(deletedIndex);
//         const indexFromDeletion = this.assetsForDeletion.findIndex(asset => asset.get('assetId') === deletedAssetId);
//         this.assetsForDeletion = this.assetsForDeletion.delete(indexFromDeletion);
//     }

//     @action
//     async deleteAssets(assets) {
//         const deletePromises = assets.map(async asset => {
//             try {
//                 const res = await AssetsDAO.delete(asset.get('assetId'));
//                 this.assetDeleteCallback(res);
//             } catch(err) {
//                 this.setError(ASSET_MANAGER.ERR_CODES.ASSET_DELETE_FAIL, handlePromiseError(err));
//                 this.clearAssetsForDeletion();
//             }
//         });
//         await Promise.all(deletePromises);
//         await this.loadAccountUsageStats();
//     }

//     @action
//     uploadNewFiles = async () => {
//         const filesList = this.processFilesForUpload(this.filesForUpload);

//         if (filesList.size === 0) {
//             this.setError(ASSET_MANAGER.ERR_CODES.UPLOAD_NO_FILES_PROVIDED);
//             return;
//         }

//         const uploadPromises = this.filesForUpload.map(async fileForUpload => {
//             const formData = new FormData();
//             formData.append('file', fileForUpload.get('file'));
//             let acsResponse = await AssetsDAO.add(formData, fileForUpload.get('fileName'));
//             // Check that all files came without errors
//             if (acsResponse instanceof Array === false) {
//                 acsResponse = [acsResponse];
//             }

//             // ACS response errors are per-file & HTTP 200 - hence promise does not fail.
//             // We still want to display errors for files that had them
//             acsResponse.forEach(fileRes => {
//                 const file = this.filesForUpload.find(file => file.get('fileName') === fileRes.name);
//                 if (file) {
//                     this.removeFile(file);
//                 }
//                 if (fileRes.error) {
//                     this.processFileError(fileRes);
//                 }
//             });

//             if (this.errorsList.size) {
//                 return;
//             }
//             const assets = this.processAssetsResponse(acsResponse);
//             this.assets = this.assets.concat(Immutable.fromJS(assets));
//         });
//         try {
//             await Promise.all(uploadPromises);
//             await this.loadAccountUsageStats();
//         } catch(err) {
//             this.setError(ASSET_MANAGER.ERR_CODES.ERR_UPLOADING_NEW_ASSETS, handlePromiseError(err));
//             this.cleanUploadFiles();
//         }
//     };

//     @action
//     setFileForUpdate(asset, selectedFile) {
//         let isValid = this.validateNativeFiles([selectedFile]);

//         // Validate that extensions match (otherwise ACS update will fail)
//         if (isValid) {
//             const assetName = asset.get('name');
//             const extCurrent = getFileNameExtension(assetName);
//             const extNewFile = getFileNameExtension(selectedFile.name);
//             const extensionsMatch = extCurrent === extNewFile;
//             if (!extensionsMatch) {
//                 this.setError(ASSET_MANAGER.ERR_CODES.FILE_EXT_MISMATCH, M.get('assetsManager.errors.EXTENSION_MISMATCH'), {
//                     fileName: selectedFile.name,
//                     extOld: extCurrent,
//                     extNew: extNewFile
//                 });
//             }
//             isValid = extensionsMatch;
//         }

//         if (isValid) {
//             selectedFile.linkedAssetID = asset.get('assetId');
//             this.fileForUpdate = selectedFile;
//         }
//     }

//     @action
//     clearUpdateFile() {
//         this.fileForUpdate = null;
//     }

//     normalizeFileNames(filesList) {
//         const NOT_FOUND = -1;
//         const ZERO = 0;
//         return filesList.map(file => {
//             const extensionIndex = file.name.lastIndexOf('.');
//             const fileNameWithoutExtension = extensionIndex !== NOT_FOUND ?
//                 file.name.substring(ZERO, extensionIndex).replace(/[^A-Za-z0-9-_]/g, '_') : file.name;
//             const fileExtension = extensionIndex !== NOT_FOUND ? file.name.substring(file.name.lastIndexOf('.')) : '';
//             let nameCounter = 1;
//             let fileName = `${fileNameWithoutExtension}${fileExtension}`;
//             let duplicateAsset = true;
//             while (duplicateAsset) {
//                 duplicateAsset = this.assets.find(asset => asset.get('name') === fileName);
//                 if (duplicateAsset) {
//                     fileName = `${fileNameWithoutExtension}_${nameCounter++}${fileExtension}`;
//                 }
//             }
//             return {
//                 fileName: fileName,
//                 file: file
//             };
//         });
//     }

//     /**
//      * Returns true or false depending on file checks result
//      * @param filesList
//      */
//     @action
//     validateNativeFiles(filesList) {
//         // Convert to array by default
//         const files = Array.prototype.slice.call(filesList);

//         // Check file sizes - and show error if too big
//         let oversizeFile = files.find(file => file.size > ASSET_MANAGER.MAX_FILE_UPLOAD_SIZE);

//         if (oversizeFile) {
//             this.setError(ASSET_MANAGER.ERR_CODES.FILE_TOO_BIG, M.get('assetsManager.errors.TOO_BIG'), {
//                 fileName: oversizeFile.name,
//                 size: getBytesString(oversizeFile.size),
//                 sizeBytes: oversizeFile.size,
//                 maxSize: getBytesString(ASSET_MANAGER.MAX_FILE_UPLOAD_SIZE)
//             });
//             return false;
//         }

//         // Do not allow uploading directories or files without extension
//         const dirFile = files.find(file => {
//             const fileExt = getFileNameExtension(file.name);
//             return file.type === '' && fileExt === '';
//         });

//         if (dirFile) {
//             this.setError(ASSET_MANAGER.ERR_CODES.DIR_UPLOAD, M.get('assetsManager.errors.DIR_UPLOAD_ERROR'), {fileName: dirFile.name});
//             return false;
//         }

//         /* Allowed file types check
//         -------------------------------------------------------------*/
//         // Do not allow uploading a file if extension is not in the allowed list
//         const allowedExtensions = _.reduce(AMCONFIG.allowedFileTypes, (allExtsArr, fileTypesCat) => {
//             return allExtsArr.concat(fileTypesCat.exts);
//         }, []);

//         const disallowedFile = files.find(file => {
//             const fileExt = getFileNameExtension(file.name);
//             return allowedExtensions.indexOf(fileExt) === -1 || file.type === '';
//         });

//         if (disallowedFile) {
//             this.setError(ASSET_MANAGER.ERR_CODES.UNSUPPORTED_FILE_EXT, M.get('assetsManager.errors.DISALLOWED_FILE_TYPE'), {
//                 fileName: disallowedFile.name,
//                 fileExt: getFileNameExtension(disallowedFile.name)
//             });
//             return false;
//         }

//         return true;
//     }

//     @action
//     processFilesForUpload = (fileList) => {
//         // Filter out directories
//         return fileList.filter(file => file.type !== '');
//     };

//     @action
//     processFileError(fileRes) {
//         const ACSErrorFileExtType = M.get('assetsManager.errors.ACS_EMPTY_EXTENSION');
//         const {error, name} = fileRes;
//         // Figure out the error type
//         if (error.search && error.search(ACSErrorFileExtType) > -1) {
//             this.setError(ASSET_MANAGER.ERR_CODES.UNSUPPORTED_FILE_EXT, error, {
//                 fileName: name,
//                 fileExt: getFileNameExtension(name)
//             });
//             return;
//         }

//         const ACSErrorFileExtMismatch = M.get('assetsManager.errors.ACS_EXTENSION_ERROR');
//         // Figure out the error type
//         if (error.search && error.search(ACSErrorFileExtMismatch) > -1) {
//             this.setError(ASSET_MANAGER.ERR_CODES.FILE_EXT_MISMATCH, error, {
//                 fileName: name,
//                 extOld: '',
//                 extNew: ''
//             });
//             return;
//         }

//         // Generic ACS Error if none of the above matched
//         if (error) {
//             this.setError(ASSET_MANAGER.ERR_CODES.ACS_GENERIC_ERROR, error, {
//                 acsError: error.name || error,
//                 fileName: name || '-'
//             });
//         }
//     }

//     @action
//     updateExistingFile = () => {
//         const files = this.processFilesForUpload([this.fileForUpdate]);
//         const [firstFile] = files;

//         if (files.length > 1) {
//             return this.setError(ASSET_MANAGER.ERR_CODES.UPDATE_MULTIPLE_FILES);
//         }

//         if (!firstFile) {
//             throw new Error(M.get('assetsManager.errors.NO_FILE_FOR_UPDATE'));
//         }

//         if (firstFile instanceof File === false) {
//             throw new Error(M.get('assetsManager.errors.TYPE_MISMATCH'));
//         }

//         const formData = new FormData();
//         formData.append('file', firstFile);
//         formData.append('params', {
//             'name': firstFile.name
//         });
//         return AssetsDAO.update(firstFile.linkedAssetID, formData)
//             .then(async res => {
//                 // Check that all files came without errors
//                 if(res instanceof Array === false) {
//                     res = [res];
//                 }

//                 // ACS response errors are per-file & HTTP 200 - hence promise does not fail.
//                 // We still want to display errors for files that had them
//                 res.forEach(fileRes => {
//                     if (fileRes.error) {
//                         this.processFileError(fileRes);
//                     }
//                 });

//                 this.clearUpdateFile();
//                 const updatedAsset = Immutable.fromJS(this.processAssetsResponse(res)[0]);
//                 const updatedAssetIndex = this.assets.findIndex(asset => {
//                     return asset.get('assetId') === updatedAsset.get('assetId');
//                 });
//                 this.assets = this.assets.delete(updatedAssetIndex).insert(updatedAssetIndex, updatedAsset);

//                 await this.loadAccountUsageStats();
//             })
//             .catch(err => {
//                 this.setError(ASSET_MANAGER.ERR_CODES.FAIL_UPDATING_ASSET, handlePromiseError(err));
//             })
//             .finally(action(() => {
//                 this.clearUpdateFile();
//             }));
//     };

//     createErrorObj(errCode, errMsg, errData = {}) {
//         return Immutable.fromJS({
//             code: errCode,
//             msg: errMsg,
//             data: errData
//         });
//     }

//     @action
//     setError(errCode = ASSET_MANAGER.ERR_CODES.GENERIC, errMsg, errData = {}) {
//         const errMsgDetected = errMsg && errMsg.message || errMsg || '';
//         const errObj = this.createErrorObj(errCode, errMsgDetected, errData);
//         this.errorsList = this.errorsList.push(errObj);
//     }

//     @action
//     clearErrors() {
//         this.errorsList = Immutable.List();
//     }

//     @action
//     storeIntroMeta(isShow) {
//         this.showInfoIntro = false;
//         if (!isShow) {
//             localStorage.setItem('showinfoAM' , false);
//         }
//     }

//     @action
//     initIntro() {
//         const infoValue = localStorage.getItem('showinfoAM');
//         this.showInfoIntro = !infoValue || !infoValue === 'false';
//     }

}

export {AppStore};
