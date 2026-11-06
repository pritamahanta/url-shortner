import { router } from "../app";


router.post('/url/add', addUrl);
router.get('/:shortCode', redirectUrl);