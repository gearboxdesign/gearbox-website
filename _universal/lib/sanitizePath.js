export default function sanitizePath (path) {

    return path.replace(/\/+/g, '/');
}