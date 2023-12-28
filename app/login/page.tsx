import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import {Card, CardBody} from "@nextui-org/card";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      {/*<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>*/}
      <Card className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <CardBody>
          {/*<div className="flex flex-col gap-4">*/}
            {/*<div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36">*/}
              <div className="w-32 text-white md:w-36 items-center">
                <AcmeLogo/>
              </div>
            {/*</div>*/}
            <LoginForm/>
          {/*</div>*/}
        </CardBody>
      </Card>
    </main>
  );
}