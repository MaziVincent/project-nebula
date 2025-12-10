import React from "react";
import { Controller } from "react-hook-form";

/**
 * Reusable checkbox group component for property features
 */
const FeatureCheckboxGroup = React.memo(
	({ name, label, features, control, register }) => {
		return (
			<div className="mb-4">
				<label className="block mb-3 text-sm font-semibold text-gray-900">
					{label}
				</label>
				<div className="grid grid-cols-2 gap-3">
					{features.map((feature) => (
						<div key={feature.value} className="flex items-center">
							<Controller
								name={name}
								control={control}
								defaultValue={[]}
								render={({ field }) => (
									<input
										type="checkbox"
										id={`${name}-${feature.value}`}
										value={feature.value}
										checked={field.value?.includes(feature.value)}
										onChange={(e) => {
											const updatedValue = e.target.checked
												? [...(field.value || []), feature.value]
												: (field.value || []).filter(
														(v) => v !== feature.value
												  );
											field.onChange(updatedValue);
										}}
										className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
										aria-label={`Select ${feature.label}`}
									/>
								)}
							/>
							<label
								htmlFor={`${name}-${feature.value}`}
								className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
								{feature.label}
							</label>
						</div>
					))}
				</div>
			</div>
		);
	}
);

FeatureCheckboxGroup.displayName = "FeatureCheckboxGroup";

export default FeatureCheckboxGroup;
