// getProjects = async() => {
    //     const url = 'http://localhost:8081/projects';
    //     return new Promise((resolve, reject) => {
    //         return fetch(url)
    //             .then(response => response.json())
    //             .then(({data}) => this.setState({projects: data}, () => {
    //                 return resolve(data);
    //             }))
    //             .catch(err => resolve(err));
    //     });
    // }


    const url = `http://localhost:8081/employees/add?firstname=${firstname}&lastname=${lastname}&project=${selectedProject}`;
        fetch(url, {method: "POST"} )
            .then(response => {
                return response.json()})
            // .then(() => {runInAction(() => this.loadData())})
                .then(() => this.loadData())
                .then(() => this.resetData())
                .catch(err => console.log(err));



//************NAYEL*********/
    // getApiUrl() {
    //     const {tz, msg} = this.state;
    //     const host = 'http://localhost:8081';
    //     return host + '/' + tz + '/' + msg + '.json';
    // }