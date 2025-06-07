---
layout: post
title: Notes on RBC calibration
published: true
date: 2025-06-07
categories: [Modelling]
tags: [tips]
---

My notes on RBC calibration.

Read more about calibration
- [Dynare's manual](https://archives.dynare.org/manual/Estimation.html)
- [Computational Methods for Economics](https://opensourceecon.github.io/CompMethods/struct_est/GMM.html)
- [Chad Fulton's notes on RBC calibration](https://www.chadfulton.com/topics/simple_rbc.html#calibration-maximum-likelihood-estimation)

## Baseline model

Preferences
$$
u(C_t,1-L_t) = \frac{C_t^{1-\sigma}}{1-\sigma} - \frac{L_t^{1+\varphi}}{1+\varphi}
$$
and a Cobb-Douglas production function.

The model's building blocks are
$$
C_t^{\sigma} L_t^{\varphi} = W_t, \\
	1 = \beta \mathbb{E}_t\left[ \frac{C_t}{C_{t+1}} (R_{t+1} + 1 - \delta)\right], \\
	R_t = \alpha \frac{Y_t}{K_t}, \\ 
	W_t = (1-\alpha)\frac{Y_t}{L_t}, \\
	Y_t = A_t K_t^\alpha L_t^{1-\alpha}, \\
	K_{t+1} = (1-\delta)K_t + I_t, \\
	C_t + I_t = Y_t, \\
	A_t = e^{z_t}, z_{t+1} = \rho_A z_t + \varepsilon_t, \varepsilon_t ~ N(0,\sigma^2_A)
$$

Log-linearized version 

$$
0 \approx \tilde{Y}_t - \frac{\tilde{L}_t}{1-\overline{L}} - \tilde{C}_t, \\
0 \approx \tilde{C}_t - \mathbb{E}_t \tilde{C}_{t+1} + \beta \overline{R} \mathbb{E}_t \tilde{R}_{t+1}, \\
0 \approx \tilde{Y}_t - \tilde{K}_t - \tilde{R}_t, \\
0 \approx z_t + \alpha \tilde{K}_t + (1-\alpha) \tilde{L}_t - \tilde{Y}_t, \\
0 \approx \overline{Y}\tilde{Y}_t - \overline{C}\tilde{C}_t + \overline{K}[(1-\delta)\tilde{K}_t - \tilde{K}_{t+1}], \\
z_{t+1} = \rho z_t + \varepsilon_t
$$
where $\tilde{x}_t = \ln x_t - \ln \overline{x}$.

## Dynare codes

The following `.mod` can be used to solve the model

```matlab
var Y I C L W R K A;
varexo e;

parameters sigma phi alpha beta delta rhoa;
sigma = 2;
phi = 1.5; 
alpha = 0.33; 
beta = 0.985; 
delta = 0.025; 
rhoa = 0.95;

model(linear);
#Rss = (1/beta)-(1-delta);
#Wss = (1-alpha)*((alpha/Rss)^(alpha/(1-alpha))); 
#Yss = ((Rss/(Rss-delta*alpha))^(sigma/(sigma+phi))) *(((1-alpha)^(-phi))*((Wss)^(1+phi)))^(1/(sigma+phi));
#Kss = alpha*(Yss/Rss);
#Iss = delta*Kss;
#Css = Yss - Iss;
#Lss = (1-alpha)*(Yss/Wss);

//1-Labor supply
sigma*C + phi*L = W;
//2-Euler equation
(sigma/beta)*(C(+1)-C)=Rss*R(+1);
//3-Law of motion of capital
K = (1-delta)*K(-1)+delta*I;
//4-Production function
Y = A + alpha*K(-1) + (1-alpha)*L;
//5-Demand for capital
R = Y - K(-1);
//6-Demand for labor
W = Y - L;
//7-Equilibrium condition
Yss*Y = Css*C + Iss*I;
//8-Productivity shock
A = rhoa*A(-1) + e;
end;

//-Steady state calculation
steady;
check; 
model_diagnostics; 
model_info;

//-Shock simulations
shocks;
var e; 
stderr 0.01; 
end;

stoch_simul(order=2, irf=20, hp_filter = 1600) Y I C L W R K A;
```

The last line produces the IRF.

![](https://raw.githubusercontent.com/thanhqtran/gso-macro-monitor/main/generated_gif/irf.png)

To extract the elements for the state-space representation, we can use the following code in MATLAB. (Please read [Sims' note](https://sites.nd.edu/esims/files/2023/05/using_dynare_sp17.pdf#page=8.77))

```matlab
% extract the parameters for state-space representation
% variable order: Y I C L W R K A
% state vars: 7, 8
p_Y = 1;
p_I = 2;
p_C = 3;
p_L = 4;
p_W = 5;
p_R = 6;
p_K = 7;
p_A = 8;

% create matrices for the state-space representation
% S(t) = A*S(t-1) + B*e(t)
% X(t) = C*S(t-1) + D*e(t)

A = [   oo_.dr.ghx(oo_.dr.inv_order_var(p_K),:);
        oo_.dr.ghx(oo_.dr.inv_order_var(p_A),:)
    ];
B = [   oo_.dr.ghu(oo_.dr.inv_order_var(p_K),:);
        oo_.dr.ghu(oo_.dr.inv_order_var(p_A),:)
    ];
C = [   oo_.dr.ghx(oo_.dr.inv_order_var(p_Y),:);
        oo_.dr.ghx(oo_.dr.inv_order_var(p_I),:);
        oo_.dr.ghx(oo_.dr.inv_order_var(p_C),:);
        oo_.dr.ghx(oo_.dr.inv_order_var(p_R),:);
        oo_.dr.ghx(oo_.dr.inv_order_var(p_W),:);
        oo_.dr.ghx(oo_.dr.inv_order_var(p_L),:);
    ];
D = [   oo_.dr.ghu(oo_.dr.inv_order_var(p_Y),:);
        oo_.dr.ghu(oo_.dr.inv_order_var(p_I),:);
        oo_.dr.ghu(oo_.dr.inv_order_var(p_C),:);
        oo_.dr.ghu(oo_.dr.inv_order_var(p_R),:);
        oo_.dr.ghu(oo_.dr.inv_order_var(p_W),:);
        oo_.dr.ghu(oo_.dr.inv_order_var(p_L),:);
    ];
```

## Computing IRFs by hand

After the extraction, one can use these values to plot the IRF manually

```matlab
% compute the impulse reponses by hand
sigma_e = 0.01;
% time horizon
H = 20;
Sirf = zeros(2,H);
Xirf = zeros(6,H);

Sirf(:,1) = B*sigma_e;
Xirf(:,1) = D*sigma_e;

for j = 2:H
    Sirf(:, j) = A*Sirf(:, j-1);
    Xirf(:, j) = C*Sirf(:, j-1);
end

%% Plotting
% Time axis
t = 1:H;

% Variable names for display (including K and A)
% variable order: Y I C L W R K A
var_names = {'Y', 'I', 'C', 'L', 'W', 'R', 'K', 'A'};

% Combine Xirf and Sirf into one matrix for plotting
IRFs_all = [Xirf; Sirf];

% Plot all IRFs
figure;
for i = 1:8
    subplot(3,3,i);
    plot(t, IRFs_all(i,:), 'LineWidth', 1, 'Color','black');
    hold on;
    yline(0, '-k', 'LineWidth', 1, 'Color','r'); % Add horizontal zero line
    hold off;
    title([var_names{i}]);
    %xlabel('Periods');
    %ylabel('Response');
    %grid on;
end

sgtitle('IRFs');
```

We can also generate the model's moments based on a random series of shocks.

```matlab
% compute a simulation. First draw shocks
T = 200;
e = sigma_e * randn(1,T);

Ssim = zeros(2,T);
Xsim = zeros(6,T);

% assume initial state is SS
Ssim(:,1) = B*e(1,1);
for j = 2:T
    Ssim(:,j) = A*Ssim(:,j-1) + B*e(1,j);
    Xsim(:,j) = C*Ssim(:,j-1) + D*e(1,j);
end

% Time axis
t = 1:T;
% Combine Xirf and Sirf into one matrix for plotting
simulated = [Xsim; Ssim];

% Plot all simulated
figure;
for i = 1:8
    subplot(3,3,i);
    plot(t, simulated(i,:), 'LineWidth', 1, 'Color','black');
    title([var_names{i}]);
end
```

![](https://raw.githubusercontent.com/thanhqtran/gso-macro-monitor/main/generated_gif/simulated_random.png)

## Model performance

### Data retrieval

First, we need some data. We use Python at this step.

```python
# library
from pandas_datareader.data import DataReader
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# Get some data
start='1975-01'
end = '2023-03'

labor = DataReader('HOHWMN02USQ065S', 'fred', start=start, end=end)         # hours
consumption = DataReader('PCECC96', 'fred', start=start, end=end)           # billions of dollars
investment = DataReader('GPDI', 'fred', start=start, end=end)               # billions of dollars
capital = DataReader('NFIRSAXDCUSQ', 'fred', start=start, end=end)          # million of dollars
population = DataReader('CNP16OV', 'fred', start=start, end=end)            # thousands of persons
# shading for recession
recessions = DataReader('USRECQ', 'fred', start=start, end=end)
recessions = recessions.resample('QS').last()['USRECQ'].iloc[1:]

# Collect the raw values
raw = pd.concat((labor, consumption, investment, capital, population.resample('QS').mean()), axis=1)
raw.columns = ['labor', 'consumption', 'investment','capital', 'population']
raw['output'] = raw['consumption'] + raw['investment']

# convert data to units and normalize with population
y = (raw['output'] * 1e9) / (raw['population'] * 1e3)
i = (raw['investment'] * 1e9) / (raw['population'] * 1e3)
c = (raw['consumption'] * 1e9) / (raw['population'] * 1e3)
k = (raw['capital'] * 1e12)/(raw['population']*1e3)
h = raw['labor']      

# assemble into 1 dataset
dta = pd.DataFrame({
    'Y': y,
    'I': i, 
    'C': c,
    'L': h,
    'K': k
})
```
The dataset is then seasonally adjusted.

```python
# seasonally adjust the data
from statsmodels.tsa.seasonal import seasonal_decompose

def seasonally_adjust(series):
    result = seasonal_decompose(series.dropna(), model='multiplicative', period=4)
    return series / result.seasonal

dta_sa = dta.apply(seasonally_adjust)
```

Now, I take logs and calculate the Solow residuals. Then I apply the HP filter to detrend it.

```python
# take logs of selected columns only
dta_log = dta_sa.copy()
dta_log['Y'] = np.log(dta_sa['Y'])
dta_log['I'] = np.log(dta_sa['I'])
dta_log['C'] = np.log(dta_sa['C'])
dta_log['L'] = np.log(dta_sa['L'])
dta_log['K'] = np.log(dta_sa['K'])
df = dta_log.copy()


# solow residuals
alpha = 0.35

# Solow residual = log A_t
df['eA'] = df['Y'] - alpha * df['K'] - (1 - alpha) * df['L']

# detrend
from statsmodels.tsa.filters.hp_filter import hpfilter

trend, cycle = {}, {}

for col in df.columns:
    cycle[col], trend[col] = hpfilter(df[col], lamb=1600)


cycle = pd.DataFrame(cycle)
trend = pd.DataFrame(trend)

new_order = ['Y', 'I', 'C', 'L', 'K','eA']
cycle_df = cycle[new_order]
cycle_df.to_csv('rbc_data.csv')

# simple plotting
cycle_cols = ['y', 'c', 'i', 'l']

fig, ax = plt.subplots(figsize=(8,6))

for col in cycle_cols:
    plt.plot(cycle_df[col], label=col.upper())


ax.fill_between(recessions.index, ylim[0]+1e-5, ylim[1]-1e-5, recessions,
                    facecolor='k', alpha=0.1)

plt.axhline(0, color='black', linewidth=1, linestyle='--')
plt.title('Cyclical Components of Y, C, I, and H (HP Filtered)')
plt.legend()
plt.tight_layout()
```

![](https://raw.githubusercontent.com/thanhqtran/gso-macro-monitor/main/generated_gif/data.png)

The business cycle moments are stored in `cycle`. 

Let's save the dataset in `rbc_data.csv`.

### Structural parameter estimation

This procedure can be done in Dynare by adding the following code block to the end of the `.mod` file. Make sure that the `rbc_data.csv` is stored at the same location as the `.mod` file.

```matlab
// ---------- Observed variables ----------
varobs Y;

// ---------- Priors for Bayesian estimation ----------
estimated_params;
sigma, normal_pdf, 2, 0.5;
phi, normal_pdf, 1.5, 0.3;
alpha, beta_pdf, 0.33, 0.05;
beta, beta_pdf, 0.985, 0.005;
delta, beta_pdf, 0.025, 0.005;
rhoa, beta_pdf, 0.95, 0.02;
stderr e, inv_gamma_pdf, 0.01, 2;
end;

// ---------- Use calibration as initial values ----------
estimated_params_init(use_calibration);
end;

// ---------- Estimation command ----------
estimation(datafile='rbc_data.csv', first_obs=1, mh_replic=20000, mh_nblocks=2, mh_jscale=0.2, mode_compute=6);
```
![](https://raw.githubusercontent.com/thanhqtran/gso-macro-monitor/main/generated_gif/bayesian.png)


| Parameter | Prior Mean | Posterior Mean | 90% HPD Interval | Prior | Std. Dev. |
| --------- | ---------- | -------------- | ---------------- | ----- | --------- |
| sigma     | 2.000      | 2.0727         | [1.2735, 2.8675] | norm  | 0.5000    |
| phi       | 1.500      | 1.4561         | [0.9421, 1.9585] | norm  | 0.3000    |
| alpha     | 0.330      | 0.3152         | [0.2291, 0.3925] | beta  | 0.0500    |
| beta      | 0.985      | 0.9854         | [0.9775, 0.9932] | beta  | 0.0050    |
| delta     | 0.025      | 0.0245         | [0.0163, 0.0328] | beta  | 0.0050    |
| rhoa      | 0.950      | 0.9056         | [0.8591, 0.9498] | beta  | 0.0200    |

One can re-run the model with the Bayesian updated parameters.

The table below shows the business cycle statistics of the model.

| Variable | Std. Dev | Relative Std. Dev | First-order AR | Contemp. Corr with Output |
| -------- | -------- | ----------------- | -------------- | ------------------------- |
| Y        | 0.0157   | 1.0000            | 0.6993         | 1.0000                    |
| I        | 0.0654   | 4.1663            | 0.6912         | 0.9939                    |
| C        | 0.0041   | 0.2579            | 0.7867         | 0.9005                    |
| L        | 0.0036   | 0.2314            | 0.7035         | 0.9126                    |
| W        | 0.0125   | 0.7945            | 0.7149         | 0.9929                    |
| R        | 0.0164   | 1.0438            | 0.6949         | 0.9446                    |
| K        | 0.0054   | 0.3428            | 0.9549         | 0.3359                    |
| A        | 0.0133   | 0.8521            | 0.6948         | 0.9987                    |    

Running the following code shall give us the statistics from the data itself.

```matlab
%% Load in real data
dat = readtable("us_test.csv");
% Extract only numeric columns
cols = dat(:, vartype('numeric'));
% Compute standard deviations
data_std = varfun(@std, cols);
% Convert to array
std_array = table2array(data_std)';
var_names = data_std.Properties.VariableNames';
% Reference variable (first column is Y)
ref_std = std_array(1);  
% Compute relative standard deviation
relative_std_array = std_array / ref_std;
% Combine into table
data_stats = table(var_names, std_array, relative_std_array, ...
    'VariableNames', {'Variable', 'Std. Dev', 'Relative Std. Dev'});

disp(data_stats);
```


| Variable | Std. Dev    | Relative Std. Dev |
| -------- | --------- | --------- |
| Y        | 0.018974  | 1         |
| I        | 0.061137  | 3.2222    |
| C        | 0.01357   | 0.71518   |
| I        | 0.0092603 | 0.48806   |
| K        | 0.035083  | 1.849     |
| eA       | 0.0081878 | 0.43154   |

Based on how closely the model performs compared to the real data, we can judge the goodness of fit of the model.

### Eyeball Simulation

Aside from statistical checks, one can also simulate the model based on a given series of shocks. 

I will treat the Solow residuals as technological shocks and use the state-space representation to plot other variables.

```matlab
%% load in real data
dat = readtable("us_test.csv");
% extract only numerical columns
cols = dat(:, vartype('numeric'));
% compute standard deviations of each columns
std_values = varfun(@std, cols);
disp(std_values);

% Multiply scalar std by tfp vector
e = transpose(dat.eA);

% time
T = length(dat.DATE);
Ssim = zeros(2,T);
Xsim = zeros(6,T);

% assume initial state is SS
Ssim(:,1) = B*e(1,1);
for j = 2:T
    Ssim(:,j) = A*Ssim(:,j-1) + B*e(1,j);
    Xsim(:,j) = C*Ssim(:,j-1) + D*e(1,j);
end

% Time axis
t = 1:T;

% Variable names for display (including K and A)
var_names = {'Y', 'I', 'C', 'L'};

% Combine Xirf and Sirf into one matrix for plotting
simulated = [Xsim; Ssim];

% Plot model's simulated against real data
% Table variable names to match each var_name
data_vars = {'y', 'i', 'c', 'l'};

figure;
for i = 1:4
    subplot(2,2,i);
    plot(t, simulated(i,:), 'k-', 'LineWidth', 1); % model
    hold on;
    plot(t, dat{:, data_vars{i}}, 'r-', 'LineWidth', 1); % data
    hold off;
    title(var_names{i});
    xlabel('Time');
    ylabel('Deviation');
    grid on;
    legend('Model', 'Data');
end
```
![](https://raw.githubusercontent.com/thanhqtran/gso-macro-monitor/main/generated_gif/simulated.png)



