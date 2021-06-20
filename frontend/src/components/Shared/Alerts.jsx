import { Snackbar } from "@material-ui/core";
import { Alert as MaterialAlert} from "@material-ui/lab";

const Alert = (props) => {
    const {showAlert, alertMessage, handleOnALertClose, severity = "success"} = props;

    return(
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={showAlert}
            autoHideDuration={3000}
            onClose={handleOnALertClose}
        >
            <MaterialAlert variant="filled" severity={severity}>
                {alertMessage}
            </MaterialAlert>
        </Snackbar>
    )
}

export default Alert;