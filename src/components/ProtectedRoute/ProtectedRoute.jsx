import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { ProfileSelector } from '../../services/reducers/profile'
import Loader from '../Loader/Loader'
import { STORAGE_TOKEN } from '../../consts'

ProtectedRoute.propTypes = {
    component: PropTypes.object.isRequired,
    forUnauthtorized: PropTypes.bool
}

export default function ProtectedRoute({ component, forUnauthtorized = false }){
    const { user, loading } = useSelector(ProfileSelector)

    const isAuthtorized = typeof user?.name !== 'undefined' || !!(localStorage.getItem(STORAGE_TOKEN))

    const location = useLocation()

    if (loading) {
        return <Loader />
    }

    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    if (isAuthtorized && forUnauthtorized) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!isAuthtorized && !forUnauthtorized) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    /*
    if (isAuthtorized && !forUnauthtorized ||
        !isAuthtorized && forUnauthtorized
    )*/
    return (<>{component}</>)

}
