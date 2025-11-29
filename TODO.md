## FORGOT PASSWORD

- send email
- store code
- validate code
- update password

## USER

- fluxo de upgrade de plano
- get user calculations
- edit user
- perform calculation

## CALCULATION

- grab static fields
- perform calculations

## ADMIN

- edit his data
- grab all users and count them
- count user per plan
- edit static props
- delete user

## LASTLINK

- criar planos
- criar webhooks to confirm and opdate, until then, wait

## GMAIL

- integration with gmail

<!--  -->

e4 = INP_planCode
e6 = INP_step
e20 = INP_safeValue
f14 = INP_stopLossTrade
g23 = INPPA_targetProfitLots
j6 = INP_currentBalance
j10 = INP_coinPairValue

export interface HantecInputs {
INP_planCode: string
INP_step?: string
INP_stopLossTrade: number // money (stop loss money)
INP_safeValue?: number
INP_currentBalance?: number
INP_coinPairValue?: number
INPPA_targetProfitLots: number
}

export interface HantecOutputs {
OUTPA_targetProfitPoints: number
OUTPA_stopLossPoints: number
OUTRA_stopLossLots: number
}

e28 =(E20/F10F14)+((E20/F10F14)/H28E18)
e27 =PROCV(J10;D39:W66;20;0)
e24 =SE(E14>J7;J7;E14)
e25 =J8
e16 =PROCV(E4;'Planos (FUNDED)'!A:G;7;0)
e15 =SE(E6=1;PROCV(E4;'Planos (FUNDED)'!A:Q;17;0);
SE(E6=2;PROCV(E4;'Planos (FUNDED)'!A:U;21;0);
SE(E6="F1";PROCV(E4;'Planos (FUNDED)'!A:X;24;0);
SE(E6="F2";PROCV(E4;'Planos (FUNDED)'!A:X;24;0);
"ERRO"))))
e14 =F14E7
e13=F13E7
e12=E9-E7
e11=E7-E10
e10=E7+(E7F10)
e9=E7+(E7F9)
e7=PROCV(E4;'Planos (FUNDED)'!A:E;3;0)
e5=CONCATENAR(PROCV(E4;'Planos (FUNDED)'!A:G;2;0);" - ";PROCV(E4;'Planos (FUNDED)'!A:G;4;0);" - ";PROCV(E4;'Planos (FUNDED)'!A:G;5;0))

f28=G28E18
f27=G27E18
f24=G24E16
f23=G23E16
f18=F17+(E27-1)
f17=(1/E17)G27100000(J9/J11)-1
f15=(J6+E24-F24)/(J9/J11)/(1/E15)/100000
f13=SE(E6=1;PROCV(E4;'Planos (FUNDED)'!A:P;14;0);
SE(E6=2;PROCV(E4;'Planos (FUNDED)'!A:T;18;0);
SE(E6="F1";PROCV(E4;'Planos (FUNDED)'!A:W;22;0);
SE(E6="F2";PROCV(E4;'Planos (FUNDED)'!A:W;22;0);
"ERRO"))))-1

f10=SE(E6=1;PROCV(E4;'Planos (FUNDED)'!A:P;15;0);
SE(E6=2;PROCV(E4;'Planos (FUNDED)'!A:T;19;0);
SE(E6="F1";PROCV(E4;'Planos (FUNDED)'!A:W;23;0);
SE(E6="F2";PROCV(E4;'Planos (FUNDED)'!A:W;23;0);
"ERRO"))))-1
f9=SE(E6=1;PROCV(E4;'Planos (FUNDED)'!A:P;16;0);
SE(E6=2;PROCV(E4;'Planos (FUNDED)'!A:T;20;0);
SE(E6="F1";PROCV(E4;'Planos (FUNDED)'!A:W;23;0);
SE(E6="F2";PROCV(E4;'Planos (FUNDED)'!A:W;23;0);
"ERRO"))))

g28=PROCV(J10;D39:V66;19;0)
OUTPA_stopLossLots=g27=G28
g24=G23
g14=SE((E14-1)>J7;"STOP MAIOR QUE MARGEM DD DAY";"OK")
g13=SE(E14<=E13;"VALOR ACIMA DO DD DAY";"OK")

h28=H24
h27=H23
OUTPA_stopLossPoints=h24=PROCV(J10;D39:I66;6;0)
OUTPA_targetProfitPoints=h23=PROCV(J10;D39:Q66;14;0)

i28=I24
i27=I23
i26=SE(J24=G13;SE(J24=G14;SE(J24=J5;"OK";"** VERIFICAR ");" VERIFICAR ");" VERIFICAR \***")
i24=PROCV(J10;D39:O66;12;0)
i23=PROCV(J10;D39:R66;15;0)

j24=SE(G23>F15;"LOTE ACIMA DO MÁX. PERMITIDO";"OK")
j11=PROCV(J10;D39:L66;9;0)
j10=USD/JPY
j8=E9-J6
j7=E9-J6
j5=SE(E20>K4;"OK";"ERRO")

k7=K6-F10
k6=(J6/E7)-1
