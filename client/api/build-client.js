import axios from 'axios';

const BuildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    } else {
        // we must be on the client
        return axios.create({
            baseURL: '/'
        });
    }
};

export default BuildClient;