import SweetAlert from "sweetalert2";

export default function Swal(title, text) {
	SweetAlert.fire({
		title,
		text,
		confirmButtonText: "Cool"
	});
}
