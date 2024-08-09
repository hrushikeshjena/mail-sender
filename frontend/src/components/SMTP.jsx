import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SMTPConfigForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (values) => {
    try {
      await axios.post('http://localhost:8080/update-smtp-config', values);
      toast.success('SMTP configuration updated successfully!');
    } catch (error) {
      toast.error('Failed to update SMTP configuration');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Update SMTP Configuration</h1>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="host" className="block text-sm font-medium text-gray-700">SMTP Host</label>
            <input
              id="host"
              {...register('host', { required: 'Please input SMTP host!' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter SMTP host"
            />
            {errors.host && <span className="text-red-500 text-sm">{errors.host.message}</span>}
          </div>
          <div>
            <label htmlFor="port" className="block text-sm font-medium text-gray-700">SMTP Port</label>
            <input
              id="port"
              {...register('port', { required: 'Please input SMTP port!' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter SMTP port"
            />
            {errors.port && <span className="text-red-500 text-sm">{errors.port.message}</span>}
          </div>
          <div>
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">SMTP User</label>
            <input
              id="user"
              {...register('user', { required: 'Please input SMTP user!' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter SMTP user"
            />
            {errors.user && <span className="text-red-500 text-sm">{errors.user.message}</span>}
          </div>
          <div>
            <label htmlFor="pass" className="block text-sm font-medium text-gray-700">SMTP Password</label>
            <input
              type="password"
              id="pass"
              {...register('pass', { required: 'Please input SMTP password!' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter SMTP password"
            />
            {errors.pass && <span className="text-red-500 text-sm">{errors.pass.message}</span>}
          </div>
          <div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Update SMTP Configuration
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SMTPConfigForm;
