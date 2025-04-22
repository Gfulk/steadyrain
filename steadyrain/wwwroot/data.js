const urlBasePath = "https://localhost:7090/api";
const headers = {
    'Content-Type': 'application/json'
};

export const GetStudents = async () => {
    let url = `${urlBasePath}/Students`;
    return fetch(new URL(url))
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(result => {
                        return result;
                    })
            }
            else {
                throw Error(`GetStudents() -> ${response.status}`);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export const GetSchools = () => {
    let url = `${urlBasePath}/School`;
    return fetch(new URL(url))
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(result => { return result; })
            } else {
                throw Error(`GetSchool() -> ${response.status}`);
            }
        })
        .catch(err => console.log(err));
}

export const AddSchool = (school) =>
{
    let url = `${urlBasePath}/School`;
    let postProperties = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(school)
    };

    return fetch(url,postProperties)
            .then(response => {
                return response.ok;
            });
}

export const AddStudent = (student) =>
{
    let url = `${urlBasePath}/Students`;
    let postProperties = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(student)
    };
    
    return fetch(url,postProperties)
            .then(response => {
                return response.ok;
            });

}

export const DeleteStudent = (studentid) =>
{
    let url = `${urlBasePath}/Students/${studentid}`;
    let postProperties = {
        method: "DELETE",
        headers: headers
    };

    return fetch(url,postProperties)
            .then(response => {
                return response.ok;
            });
}

export const UpdateStudent = (student) =>
{
    let url = `${urlBasePath}/Student`;
    let postProperties = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(student)
    };

    return fetch(url,postProperties)
            .then(response => {
                return response.ok;
            });
}