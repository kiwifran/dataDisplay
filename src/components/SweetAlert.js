import SweetAlert from "sweetalert2";
// configure the sweet alert popup
export default function Swal(title, text) {
	SweetAlert.fire({
		title,
		text,
		confirmButtonText: "Cool"
	});
}
