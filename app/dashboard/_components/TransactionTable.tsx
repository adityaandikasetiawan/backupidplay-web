import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface TransactionData {
  Payment_Date: string;
  Sub_Product: string;
  Payment_Method: string;
  Total: number;
  AR_Status: string;
}

interface IProps {
  transactions: TransactionData[];
}

const TransactionTable = ({ transactions }: IProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };
  const getStatusBadge = (status: string) => {
    const normalized = (status || '').toLowerCase();
    if (normalized.includes('lunas') || normalized.includes('berhasil')) {
      return {
        label: 'Berhasil',
        className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500'
      };
    }
    if (normalized.includes('pending') || normalized.includes('belum')) {
      return {
        label: 'Pending',
        className: 'bg-amber-100 text-amber-700 border-amber-200',
        dot: 'bg-amber-500'
      };
    }
    return {
      label: 'Gagal',
      className: 'bg-rose-100 text-rose-700 border-rose-200',
      dot: 'bg-rose-500'
    };
  };
  return (
    <Table className="w-full min-w-full overflow-x-auto">
      <TableHeader>
        <TableRow className="border-b-slate-200">
          <TableHead>Tanggal Pembayaran</TableHead>
          <TableHead>Paket / Layanan</TableHead>
          <TableHead>Metode Pembayaran</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow
            key={transaction.Payment_Date}
            className="border-b-slate-200"
          >
            <TableCell>{transaction.Payment_Date}</TableCell>
            <TableCell>{transaction.Sub_Product}</TableCell>
            <TableCell>{transaction.Payment_Method}</TableCell>
            <TableCell>{formatCurrency(transaction.Total)}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${getStatusBadge(transaction.AR_Status).className}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${getStatusBadge(transaction.AR_Status).dot}`}
                ></span>
                {getStatusBadge(transaction.AR_Status).label}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
